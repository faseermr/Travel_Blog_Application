package com.code.travel_blog.security.service;

import com.code.travel_blog.Repository.AuthorRepository;
import com.code.travel_blog.model.Author;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthorDetailsServiceImpl implements UserDetailsService {
    @Autowired
    AuthorRepository authorRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Author author = authorRepository.findByUsername(username);
              //  .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        return AuthorDetailsImpl.build(author);
    }

}


