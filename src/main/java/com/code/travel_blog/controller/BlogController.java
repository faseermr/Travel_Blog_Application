package com.code.travel_blog.controller;

import com.code.travel_blog.Repository.AuthorRepository;
import com.code.travel_blog.Repository.BlogRepository;
import com.code.travel_blog.model.Author;
import com.code.travel_blog.model.Blog;
import com.code.travel_blog.payload.response.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/blog")
public class BlogController {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private AuthorRepository authorRepository;
    @Value("${app.uploads}")
    private String FOLDER_PATH;

            //="E:/SpringBoot/travel_blog/blog-client/public/uploads/";

//    @PostMapping()
//    public ResponseEntity<?> addBlogs(@RequestParam MultipartFile image, @RequestParam String title,
//                                      @RequestParam String description, ModelMap modelMap ) throws IOException {
//        System.out.println(title);
//        //String filePath = FOLDER_PATH + file.getOriginalFilename();
//       // blogRepository.save(blog);
//       // file.transferTo(new File(filePath));
//
//        return ResponseEntity.status(HttpStatus.CREATED).body("success");
//    }

    // add blog to DB
    @PostMapping("/{author}")
    public ResponseEntity<?> addBlogs(@RequestParam("image") MultipartFile image,
                                      @RequestParam("title") String title,
                                      @RequestParam("description") String description,
                                      @PathVariable("author") long id) throws IOException {
        Author author = authorRepository.findById(id).orElseThrow();
        String fileMoveDir = FOLDER_PATH + image.getOriginalFilename();
        String filePath = "uploads/" + image.getOriginalFilename();
        Blog blog = new Blog(title,description,filePath,author);
        blogRepository.save(blog);
        image.transferTo(new File(fileMoveDir));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ResponseData<Blog>(blog,"Blog added successfully"));
    }

    // get all blogs
    @GetMapping
    public ResponseEntity<?> getAllBlogs(){
       List<Blog> blog = blogRepository.findAll(Sort.by("id").descending());
        return ResponseEntity.status(HttpStatus.OK).body(blog);
    }

    // delete blog by id
    @DeleteMapping("/{id}")
    ResponseEntity<?> deleteBlog(@PathVariable("id") long id){
        blogRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseData<String>(null,"Successfully Deleted"));
    }

    // get blog by username
    @GetMapping("/username/{name}")
    public ResponseEntity<?> getBlogByUsername(@PathVariable("name") String name){
        List<Blog> blog=  blogRepository.findByAuthorUsername(name,Sort.by("id").descending());
        return ResponseEntity.status(HttpStatus.OK).body(blog);
    }

    // get blog by id
    @GetMapping("/{id}")
    public ResponseEntity<?> getBlogById(@PathVariable("id") long id){
        Blog blog=  blogRepository.findById(id).orElseThrow();
        return ResponseEntity.status(HttpStatus.OK).body(blog);
    }

    // update blog by id
@PutMapping("/update/{id}")
    public ResponseEntity<?> editBlog(@PathVariable("id") long id,@RequestBody Blog blog){
    Blog edit_blog=  blogRepository.findById(id).orElseThrow();
    edit_blog.setTitle(blog.getTitle());
    edit_blog.setDescription(blog.getDescription());
    blogRepository.save(edit_blog);
    return ResponseEntity.status(HttpStatus.CREATED)
            .body(new ResponseData<Blog>(edit_blog,"Blog updated successfully"));

}

}
