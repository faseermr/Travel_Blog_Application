package com.code.travel_blog.Repository;

import com.code.travel_blog.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author,Long> {

    Author findByUsername(String username);

    Author findByEmail(String email);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);
}
