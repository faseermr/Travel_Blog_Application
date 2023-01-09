package com.code.travel_blog.controller;


import com.code.travel_blog.Repository.AuthorRepository;
import com.code.travel_blog.security.jwt.JwtUtills;
import com.code.travel_blog.model.Author;
import com.code.travel_blog.payload.request.LoginRequest;
import com.code.travel_blog.payload.request.SignupRequest;
import com.code.travel_blog.payload.response.JwtResponse;
import com.code.travel_blog.payload.response.MessageResponse;
import com.code.travel_blog.security.service.AuthorDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthorController {

    @Autowired
    AuthorRepository authorRepository;

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtills jwtUtills;

    // create user account
@PostMapping("/signup")
public ResponseEntity<?> createUser(@Valid @RequestBody SignupRequest signupRequest){
    //System.out.println("body : " + signupRequest.getUsername());
    if (authorRepository.existsByUsername( signupRequest.getUsername())) {
        return ResponseEntity
                .badRequest()
                .body(new MessageResponse("Error: Username is already taken!"));
    }

    if (authorRepository.existsByEmail(signupRequest.getEmail())) {
        return ResponseEntity
                .badRequest()
                .body(new MessageResponse("Error: Email is already in use!"));
    }

    Author author = new Author(signupRequest.getUsername(),signupRequest.getEmail(),
            passwordEncoder.encode(signupRequest.getPassword()));


authorRepository.save(author);

return ResponseEntity.status(HttpStatus.CREATED).body(new MessageResponse("Successfully Registerd"));

}

// login user account
@PostMapping("/signin")
public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest){
    //System.out.println("body : "+ loginRequest.getUsername() + " " + loginRequest.getPassword());
    Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
   // System.out.println("body1111 : "+ loginRequest.getUsername() + loginRequest.getPassword());
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = jwtUtills.generateJwtToken(authentication);
    //System.out.println("Token : " + jwt);
    AuthorDetailsImpl authorDetails = (AuthorDetailsImpl) authentication.getPrincipal();
    //System.out.println("Token : " + authorDetails);

    //return ResponseEntity.status(HttpStatus.CREATED).body("Sucess");
    List<String> roles = authorDetails.getAuthorities().stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toList());
    return ResponseEntity.status(HttpStatus.OK).body(
            new JwtResponse(
            jwt,
            authorDetails.getId(),
            authorDetails.getUsername(),
            authorDetails.getEmail(),roles
                    )
    );
}

// get all authors
@GetMapping("/authors")
public ResponseEntity<?> getAllAuthors(){
    List<Author> authors = authorRepository.findAll();
    return  ResponseEntity.status(HttpStatus.OK).body(authors);
}

}
