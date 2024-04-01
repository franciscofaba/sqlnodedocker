SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema BBD_CRM
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema BBD_CRM
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `BBD_CRM` DEFAULT CHARACTER SET utf8 ;
USE `BBD_CRM` ;

-- -----------------------------------------------------
-- Table `BBD_CRM`.`Career/postgraduate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BBD_CRM`.`Career/postgraduate` (
  `idCareer` INT NOT NULL,
  `careerName` VARCHAR(45) NULL,
  `degreeType` VARCHAR(45) NULL,
  PRIMARY KEY (`idCareer`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BBD_CRM`.`Course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BBD_CRM`.`Course` (
  `idCourse` INT NOT NULL,
  `idCareer_fk` INT NOT NULL,
  `courseName` VARCHAR(45) NULL,
  `semesterNumber` VARCHAR(45) NULL,
  PRIMARY KEY (`idCourse`, `idCareer_fk`),
  INDEX `fk_Class_Career/postgraduate1_idx` (`idCareer_fk` ASC) VISIBLE,
  CONSTRAINT `fk_Class_Career/postgraduate1`
    FOREIGN KEY (`idCareer_fk`)
    REFERENCES `BBD_CRM`.`Career/postgraduate` (`idCareer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BBD_CRM`.`Student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BBD_CRM`.`Student` (
  `idStudent` INT NOT NULL,
  `idCareer_fk` INT NOT NULL,
  `studentName` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`idStudent`, `idCareer_fk`),
  INDEX `fk_Student_Career/postgraduate_idx` (`idCareer_fk` ASC) VISIBLE,
  CONSTRAINT `fk_Student_Career/postgraduate`
    FOREIGN KEY (`idCareer_fk`)
    REFERENCES `BBD_CRM`.`Career/postgraduate` (`idCareer`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BBD_CRM`.`StudentClassIntermediate`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BBD_CRM`.`StudentClassIntermediate` (
  `idStudent_fk` INT NOT NULL,
  `idCourse_fk` INT NOT NULL,
  `idCareer_fk` INT NOT NULL,
  `professor` VARCHAR(45) NULL,
  `courseName` VARCHAR(45) NULL,
  `idStudentClass` VARCHAR(45) NOT NULL,
  `courseStatus` VARCHAR(45) NULL,
  PRIMARY KEY (`idStudent_fk`, `idCourse_fk`, `idCareer_fk`, `idStudentClass`),
  INDEX `fk_Student_has_Class_Class1_idx` (`idCourse_fk` ASC) VISIBLE,
  INDEX `fk_Student_has_Class_Student1_idx` (`idStudent_fk` ASC, `idCareer_fk` ASC) VISIBLE,
  CONSTRAINT `fk_Student_has_Class_Student1`
    FOREIGN KEY (`idStudent_fk` , `idCareer_fk`)
    REFERENCES `BBD_CRM`.`Student` (`idStudent` , `idCareer_fk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Student_has_Class_Class1`
    FOREIGN KEY (`idCourse_fk`)
    REFERENCES `BBD_CRM`.`Course` (`idCourse`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BBD_CRM`.`Attendance`
-- -----------------------------------------------------

ALTER TABLE `BBD_CRM`.`StudentClassIntermediate` ADD INDEX `idx_idStudentClass` (`idStudentClass`);

CREATE TABLE IF NOT EXISTS `BBD_CRM`.`Attendance` (
  `idAttendance` VARCHAR(45) NOT NULL,
  `date` date NOT NULL,
  `attendance` VARCHAR(45) NULL,
  `justification` VARCHAR(45) NULL,
  `idStudentClass_fk` VARCHAR(45) NOT NULL,
  `idStudent_fk` INT NOT NULL,
  PRIMARY KEY (`idAttendance`),
  INDEX `fk_Attendance_StudentClassIntermediate1_idx` (`idStudentClass_fk` ASC) VISIBLE,
  INDEX `fk_Attendance_Student1_idx` (`idStudent_fk` ASC) VISIBLE,
  CONSTRAINT `fk_Attendance_StudentClassIntermediate1`
    FOREIGN KEY (`idStudentClass_fk`)
    REFERENCES `BBD_CRM`.`StudentClassIntermediate` (`idStudentClass`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Attendance_Student1`
    FOREIGN KEY (`idStudent_fk`)
    REFERENCES `BBD_CRM`.`Student` (`idStudent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BBD_CRM`.`Regulation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BBD_CRM`.`Regulation` (
  `idCourse_fk` INT NOT NULL,
  `questions` VARCHAR(45) NULL,
  `answers` VARCHAR(45) NULL,
  PRIMARY KEY (`idCourse_fk`),
  CONSTRAINT `fk_Regulation_Course1`
    FOREIGN KEY (`idCourse_fk`)
    REFERENCES `BBD_CRM`.`Course` (`idCourse`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BBD_CRM`.`login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BBD_CRM`.`login` (
  `email` VARCHAR(150) NOT NULL,
  `password` VARCHAR(45) NULL,
  `idStudent_fk` INT NOT NULL,
  PRIMARY KEY (`email`, `idStudent_fk`),
  INDEX `fk_login_Student1_idx` (`idStudent_fk` ASC) VISIBLE,
  CONSTRAINT `fk_login_Student1`
    FOREIGN KEY (`idStudent_fk`)
    REFERENCES `BBD_CRM`.`Student` (`idStudent`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `BBD_CRM` ;


-- Inserting data into the Career/postgraduate table
INSERT INTO `BBD_CRM`.`Career/postgraduate` (`idCareer`, `careerName`, `degreeType`) VALUES
(1, 'Computer Engineering', 'Bachelor'),
(2, 'Business Administration', 'Bachelor');

-- Inserting data into the Course table
INSERT INTO `BBD_CRM`.`Course` (`idCourse`, `idCareer_fk`, `courseName`, `semesterNumber`) VALUES
(101, 1, 'Advanced Programming', 'Fifth Semester'),
(102, 1, 'Database Systems', 'Fourth Semester'),
(103, 2, 'Accounting', 'Third Semester');

-- Inserting data into the Student table
INSERT INTO `BBD_CRM`.`Student` (`idStudent`, `idCareer_fk`, `studentName`, `email`) VALUES
(1001, 1, 'Juan Pérez', 'juan@example.com'),
(1002, 1, 'María Gómez', 'maria@example.com'),
(1003, 2, 'Carlos López', 'carlos@example.com');

-- Inserting data into the StudentClassIntermediate table
INSERT INTO `BBD_CRM`.`StudentClassIntermediate` (`idStudent_fk`, `idCourse_fk`, `idCareer_fk`, `professor`, `courseName`, `idStudentClass`, `courseStatus`) VALUES
(1001, 101, 1, 'Professor 1', 'Advanced Programming', 'A101', 'Active'),
(1002, 102, 1, 'Professor 2', 'Database Systems', 'A102', 'Active'),
(1003, 103, 2, 'Professor 3', 'Accounting', 'A103', 'Active');

-- Inserting data into the Attendance table
INSERT INTO `BBD_CRM`.`Attendance` (`idAttendance`,`date`,`attendance`, `justification`, `idStudentClass_fk`, `idStudent_fk`) VALUES
('1A','2024-03-27', 'Present', NULL, 'A101', 1001),
('2A','2024-03-27', 'Absent', 'Illness', 'A102', 1002),
('3A','2024-03-27', 'Present', NULL, 'A103', 1003);

-- Inserting data into the Regulation table
INSERT INTO `BBD_CRM`.`Regulation` (`idCourse_fk`, `questions`, `answers`) VALUES
(101, 'Question 1', 'Answer 1'),
(102, 'Question 2', 'Answer 2'),
(103, 'Question 3', 'Answer 3');

-- Inserting data into the login table
INSERT INTO `BBD_CRM`.`login` (`email`, `password`, `idStudent_fk`) VALUES
('juan@example.com', 'password123', 1001),
('maria@example.com', 'password456', 1002),
('carlos@example.com', 'password789', 1003);