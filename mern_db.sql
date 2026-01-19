--------First DROP ALL TABLES------
DROP TABLE user,courses,students,video;




------CREATE ALL TABLES-------

CREATE TABLE user (
    email VARCHAR(25) UNIQUE ,
    password VARCHAR(100),
    role enum('admin','user' ) DEFAULT "user"
);

INSERT INTO user  VALUES
('admin@gmail.com','12345','admin');




CREATE TABLE courses(
    course_id int PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(25),
    description VARCHAR(100),
    fees int,
    start_date DATE,
    end_date DATE,
    video_expiry_days int
    
);



CREATE TABLE students(
    reg_no int PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(25),
    email VARCHAR(25),
    course_id int ,FOREIGN KEY(course_id) REFERENCES courses(course_id),
    mobile_no int,
    profile_pic blob
);



CREATE TABLE video(
    video_id int PRIMARY KEY AUTO_INCREMENT,
    course_id int ,FOREIGN KEY (course_id) REFERENCES courses(course_id),
    title VARCHAR(25),
    description VARCHAR(100),
    youtube_url VARCHAR(100),
    added_at DATE
);


