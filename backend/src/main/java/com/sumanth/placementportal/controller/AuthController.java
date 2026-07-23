    package com.sumanth.placementportal.controller;
    import com.sumanth.placementportal.entity.Application;
    import com.sumanth.placementportal.entity.Resume;
    import com.sumanth.placementportal.entity.User;
    import com.sumanth.placementportal.jwt.JwtService;
    import com.sumanth.placementportal.repository.ApplicationRepository;
    import com.sumanth.placementportal.repository.ResumeRepository;
    import com.sumanth.placementportal.repository.UserRepository;
    import com.sumanth.placementportal.service.UserService;
    import com.sumanth.placementportal.service.EmailService;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.multipart.MultipartFile;
    import com.sumanth.placementportal.service.ResumeAnalyzerService;
    import com.sumanth.placementportal.entity.JobDescription;
    import com.sumanth.placementportal.repository.JobDescriptionRepository;
    import org.apache.pdfbox.Loader;
    import org.apache.pdfbox.pdmodel.PDDocument;
    import org.apache.pdfbox.text.PDFTextStripper;


    import java.io.File;
    import java.util.List;

    @RestController
    @RequestMapping("/api/auth")
    public class AuthController {

        @Autowired
        private UserService userService;

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private ApplicationRepository applicationRepository;

        @Autowired
        private ResumeRepository resumeRepository;

        @Autowired
        private JobDescriptionRepository jobDescriptionRepository;

        @Autowired
        private ResumeAnalyzerService resumeAnalyzerService;

        @Autowired
        private JwtService jwtService;

        @Autowired
        private AuthenticationManager authenticationManager;

        @Autowired
        private EmailService emailService;
        // ================= REGISTER =================

        @PostMapping("/register")
        public User register(@RequestBody User user) {
            return userService.registerUser(user);
        }

        // ================= LOGIN =================

        // ================= LOGIN =================

        @PostMapping("/login")
        public String login(@RequestBody User user) {

            System.out.println("========== LOGIN REQUEST ==========");
            System.out.println("Email = " + user.getEmail());

            // Authenticate user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            user.getPassword()
                    )
            );

            // Fetch user from database
            User loggedUser = userRepository.findByEmail(user.getEmail())
                    .orElseThrow(() -> new RuntimeException("User Not Found"));

            System.out.println("User Found = " + loggedUser.getEmail());
            System.out.println("Role = " + loggedUser.getRole());

            // Generate JWT
            String token = jwtService.generateToken(loggedUser.getEmail());

            System.out.println("JWT Generated Successfully");
            System.out.println("==============================");

            return token;
        }

        // ================= TOKEN =================

        // ================= TOKEN =================

        @GetMapping("/token")
        public String getToken() {

            System.out.println("Token endpoint called");

            return "Working";
        }

        // ================= USERS =================

        @GetMapping("/users")
        public List<User> getAllUsers() {
            return userRepository.findAll();
        }

        @GetMapping("/users/{id}")
        public User getUserById(@PathVariable Long id) {
            return userRepository.findById(id).orElse(null);
        }

        @PutMapping("/users/{id}")
        public User updateUser(
                @PathVariable Long id,
                @RequestBody User user) {

            return userService.updateUser(id, user);
        }

        @DeleteMapping("/users/{id}")
        public String deleteUser(@PathVariable Long id) {

            userService.deleteUser(id);

            return "User Deleted Successfully";
        }

        // ================= STUDENT =================

        @GetMapping("/student/home")
        public String studentHome() {
            return "Welcome Student";
        }

        @PostMapping("/student/apply/{driveId}")
        public String applyDrive(@PathVariable Long driveId) {

            Application application = new Application();

            application.setDriveId(driveId);

            // Temporary Student Id
            application.setStudentId(1L);

            application.setApplicationStatus("APPLIED");

            applicationRepository.save(application);

            return "Application Submitted Successfully";
        }

        // ================= RESUME UPLOAD =================

        @PostMapping("/student/upload-resume")
        public String uploadResume(
                @RequestParam("file") MultipartFile file)
                throws Exception {

            String uploadDir =
                    System.getProperty("user.dir")
                            + File.separator
                            + "uploads"
                            + File.separator;

            File directory = new File(uploadDir);

            if (!directory.exists()) {
                directory.mkdirs();
            }

            String fileName = file.getOriginalFilename();

            File destinationFile =
                    new File(uploadDir + fileName);

            System.out.println(
                    "Saving File To : "
                            + destinationFile.getAbsolutePath()
            );

            file.transferTo(destinationFile);

            int score =
                    resumeAnalyzerService.analyzeResume(
                            destinationFile.getAbsolutePath()
                    );

            System.out.println(
                    "Resume Score = " + score
            );

            Resume resume = new Resume();

            resume.setStudentId(1L);

            resume.setFileName(fileName);

            resume.setFilePath(
                    destinationFile.getAbsolutePath()
            );

            resume.setScore(score);

            resumeRepository.save(resume);

            return "Resume Uploaded Successfully. Score = "
                    + score;
        }

        // View All Resumes

        @GetMapping("/student/resumes")
        public List<Resume> getAllResumes() {

            return resumeRepository.findAll();
        }

        // View Resume By Id

        @GetMapping("/student/resume/{id}")
        public Resume getResumeById(
                @PathVariable Long id) {

            return resumeRepository.findById(id)
                    .orElse(null);
        }

        // ================= ADMIN =================

        @GetMapping("/admin/home")
        public String adminHome() {
            return "Welcome Admin";
        }

        // ================= RECRUITER =================
        @GetMapping("/recruiter/home")
        public String recruiterHome() {
            return "Welcome Recruiter";
        }

        @GetMapping("/recruiter/top-resumes")
        public List<Resume> getTopResumes() {

            return resumeRepository.findAll()
                    .stream()
                    .sorted((a, b) ->
                            b.getScore().compareTo(a.getScore()))
                    .toList();
        }

        @GetMapping("/recruiter/match/{resumeId}/{jobId}")
        public String matchResumeWithJob(
                @PathVariable Long resumeId,
                @PathVariable Long jobId) {

            Resume resume = resumeRepository
                    .findById(resumeId)
                    .orElse(null);

            JobDescription job = jobDescriptionRepository
                    .findById(jobId)
                    .orElse(null);

            if (resume == null || job == null) {
                return "Resume or Job not found";
            }

            String resumeText = "";

            try {

                File pdfFile =
                        new File(resume.getFilePath());

                PDDocument document =
                        Loader.loadPDF(pdfFile);

                PDFTextStripper stripper =
                        new PDFTextStripper();

                resumeText =
                        stripper.getText(document)
                                .toLowerCase();

                document.close();

            } catch (Exception e) {

                return "Error Reading Resume";
            }

            String jobSkills =
                    job.getDescription().toLowerCase();

            String[] skills = {
                    "java",
                    "spring",
                    "sql",
                    "html",
                    "css",
                    "git",
                    "rest api",
                    "mongodb",
                    "react",
                    "node.js"
            };

            int totalSkills = 0;
            int matchedSkills = 0;

            for (String skill : skills) {

                if (jobSkills.contains(skill)) {

                    totalSkills++;

                    if (resumeText.contains(skill)) {
                        matchedSkills++;
                    }
                }
            }

            double matchPercentage = 0;

            if (totalSkills > 0) {

                matchPercentage =
                        ((double) matchedSkills
                                / totalSkills) * 100;
            }

            String result;

            if (matchPercentage >= 80) {
                result = "Excellent Match";
            }
            else if (matchPercentage >= 50) {
                result = "Good Match";
            }
            else {
                result = "Poor Match";
            }

            return "Matched Skills = "
                    + matchedSkills
                    + "/"
                    + totalSkills
                    + " | Match Percentage = "
                    + matchPercentage
                    + "% | Result = "
                    + result;
        }

        @GetMapping("/recruiter/applications")
        public List<Application> getAllApplications() {

            return applicationRepository.findAll();
        }

        // Shortlist Student

        @PutMapping("/recruiter/application/{id}/select")
        public Application selectStudent(
                @PathVariable Long id) {

            Application app =
                    applicationRepository.findById(id)
                            .orElse(null);

            if (app != null) {

                app.setApplicationStatus("SELECTED");

                applicationRepository.save(app);
                System.out.println("Application Id = " + id);
                System.out.println("Student Id = " + app.getStudentId());
                User student =
                        userRepository.findById(
                                app.getStudentId()
                        ).orElse(null);

                if(student != null) {
                    emailService.sendSelectionMail(
                            student.getEmail()
                    );
                }
            }

            return app;
        }
        // Reject Student



        // Select Student



        // Dashboard Count APIs

        @GetMapping("/recruiter/application-count")
        public long applicationCount() {

            return applicationRepository.count();
        }

        @GetMapping("/recruiter/selected-count")
        public long selectedCount() {

            return applicationRepository.findAll()
                    .stream()
                    .filter(app ->
                            "SELECTED".equals(
                                    app.getApplicationStatus()))
                    .count();
        }

        @GetMapping("/recruiter/rejected-count")
        public long rejectedCount() {

            return applicationRepository.findAll()
                    .stream()
                    .filter(app ->
                            "REJECTED".equals(
                                    app.getApplicationStatus()))
                    .count();
        }

        @GetMapping("/recruiter/shortlisted-count")
        public long shortlistedCount() {

            return applicationRepository.findAll()
                    .stream()
                    .filter(app ->
                            "SHORTLISTED".equals(
                                    app.getApplicationStatus()))
                    .count();
        }
        @GetMapping("/recruiter/dashboard")
        public String dashboard() {

            long totalResumes =
                    resumeRepository.count();

            long totalApplications =
                    applicationRepository.count();

            long shortlisted =
                    applicationRepository.findAll()
                            .stream()
                            .filter(app ->
                                    "SHORTLISTED".equals(
                                            app.getApplicationStatus()))
                            .count();

            long selected =
                    applicationRepository.findAll()
                            .stream()
                            .filter(app ->
                                    "SELECTED".equals(
                                            app.getApplicationStatus()))
                            .count();

            return "Total Resumes = "
                    + totalResumes
                    + ", Total Applications = "
                    + totalApplications
                    + ", Shortlisted = "
                    + shortlisted
                    + ", Selected = "
                    + selected;
        }
        @GetMapping("/recruiter/best-resume")
        public Resume bestResume() {

            return resumeRepository.findAll()
                    .stream()
                    .max((a, b) ->
                            a.getScore()
                                    .compareTo(b.getScore()))
                    .orElse(null);
        }
        @GetMapping("/recruiter/selected-students")
        public List<Application> selectedStudents() {

            return applicationRepository.findAll()
                    .stream()
                    .filter(app ->
                            "SELECTED".equals(
                                    app.getApplicationStatus()))
                    .toList();
        }
    }