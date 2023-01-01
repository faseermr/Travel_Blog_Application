package com.code.travel_blog.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Optional;

@Entity
@Table(name = "travel_blogs")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Blog {

        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long id;

        private String title;
        private String description;
        private String filePath;

        @ManyToOne(fetch = FetchType.EAGER,optional = false)
        @JoinColumn(name = "author_id",referencedColumnName = "id",nullable = false)
        private Author author;


        public Blog(String title, String description, String filePath, Author author) {
                this.title = title;
                this.description = description;
                this.filePath = filePath;
                this.author = author;
        }


}
