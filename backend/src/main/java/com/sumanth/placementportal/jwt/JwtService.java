package com.sumanth.placementportal.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "mysecretkeymysecretkeymysecretkey123456";

    private SecretKey getSignKey() {
        return Keys.hmacShaKeyFor(
                SECRET_KEY.getBytes()
        );
    }

    // Generate JWT Token
    public String generateToken(String email) {

        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(
                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60
                        )
                )
                .signWith(
                        getSignKey(),
                        SignatureAlgorithm.HS256
                )
                .compact();
    }

    // Extract Username (Email)
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Extract All Claims
    public Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Check Token Expiry
    public boolean isTokenExpired(String token) {

        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());
    }

    // Validate Token
    public boolean validateToken(
            String token,
            UserDetails userDetails) {

        String username =
                extractUsername(token);

        System.out.println("Token Username = " + username);
        System.out.println("DB Username = " + userDetails.getUsername());
        System.out.println("Expired = " + isTokenExpired(token));

        return username.equals(
                userDetails.getUsername()
        ) && !isTokenExpired(token);
    }
}