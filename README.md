
# 🏥 Hospital Management System

This is a Spring Boot + JPA + MySQL based project that helps manage hospital data like doctors, patients, departments, and insurance.

---

## 💡 Key Features

- Doctor, Patient, Department, Insurance Management
- Blood Group Reporting with DTOs
- Spring Boot + JPA + MySQL Integration
- Clean Layered Architecture
- Real-time Data Reporting using JPQL

---

## 🧱 Technologies Used

- Java
- Spring Boot
- Spring Data JPA
- MySQL
- Maven
- Lombok

---

## 📁 Project Modules

- `Doctor` Entity & CRUD
- `Patient` Entity with `Insurance` & `BloodGroup`
- `Department` Entity with One-to-Many Relationship
- `DTO` Reporting Layer
- Enum: `BloodGroupType`
- Repository Layer (Spring Data JPA)
- Service Layer
- Controller Layer

---

## 🔗 JPA Relationships

- `@OneToOne` → Patient ↔ Insurance
- `@ManyToOne` → Patient → Department
- `@OneToMany` → Department → Patients

---

## 📊 Example Report

### 🔹 Blood Group Count Report

```java
@Query("SELECT new com.nt.dto.BloodGroupCountResponseEntity(p.bloodGroup, COUNT(p)) FROM Patient p GROUP BY p.bloodGroup")
List<BloodGroupCountResponseEntity> countEachBloodGroupType();
=======
# Hospital-Management-System
Spring Boot + MySQL based Hospital Project


# 🏥 Hospital Management System

A Spring Boot + JPA-based **Hospital Management System** to manage Doctors, Patients, Departments, and Insurance with blood group reports and JUnit tests.

---

## ✅ Features

- 👨‍⚕️ Doctor & Department Management
- 🩸 Blood Group-based Patient Report
- 🧾 Insurance Details
- 🔗 JPA Relationships: OneToOne, ManyToOne
- 🧪 JUnit Test Classes
- 🗃️ Auto SQL Load via `data.sql`
- 📊 Custom JPQL with DTO Report

---

## 📁 Project Structure

src/
├── main/java/com/nt/
│ ├── entity/
│ ├── dto/
│ ├── repository/
│ ├── service/
│ └── HospitalManagementSystemApplication.java
├── resources/
│ ├── application.properties
│ └── data.sql
├── test/java/com/nt/test/



---

## 🔧 Technologies

- Java + Spring Boot
- Spring Data JPA
- MySQL
- JUnit 5
- Maven

---

## 🚀 How to Run

1. Clone the repo  
git clone https://github.com/kodeMapper/hospital-management-system.git



2. Open in **Eclipse**

3. Create MySQL DB: `hospitaldb`

4. Configure DB in `application.properties`

5. Run the app → `HospitalManagementSystemApplication.java`

---

## 👨‍💻 Author

**Sarang Gade**
💼 Spring Boot Developer  
📧 Email: saranganilgade@gmail.com

Linkedin :-
www.linkedin.com/in/sarang-gade

---
