package com.code.travel_blog.Repository;

import com.code.travel_blog.model.Blog;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog,Long> {
   List<Blog> findByAuthorUsername(String username, Sort sort);
}
