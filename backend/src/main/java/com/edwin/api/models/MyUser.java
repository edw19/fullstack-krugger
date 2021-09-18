package com.edwin.api.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity (name = "users")
public class MyUser {
	
	public MyUser () {}

	public MyUser(String identification, String password, String name, String secondName, String surname,
			String secondSurname, String email, String dateBirth, String homeAddress, String mobilePhone,
			String vaccinationStatus, String typeVacine, String vaccinationDate, int doses, String role) {
		super();
		this.identification = identification;
		this.password = password;
		this.name = name;
		this.secondName = secondName;
		this.surname = surname;
		this.secondSurname = secondSurname;
		this.email = email;
		this.dateBirth = dateBirth;
		this.homeAddress = homeAddress;
		this.mobilePhone = mobilePhone;
		this.vaccinationStatus = vaccinationStatus;
		this.typeVacine = typeVacine;
		this.vaccinationDate = vaccinationDate;
		this.doses = doses;
		this.role = role;
	}



	// Fields for user
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column (unique = true)
	private String identification;
	@Column (nullable = true)
	private String password;
	
	// fields information employee
	@Column (nullable = false)
	private String name;
	@Column (nullable = false)
	private String secondName;
	@Column (nullable = false)
	private String surname;
	@Column (nullable = false)
	private String secondSurname;
	@Column (nullable = false)
	private String email;
	
	
	// fields to complete information from ui 
	@Column(name = "dateBirth")
	private String dateBirth;
	private String homeAddress;
	private String mobilePhone;
	private String vaccinationStatus;
	// if employee is vaccinated
	private String typeVacine;
	private String vaccinationDate;
	private int doses;
	private String role;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getIdentification() {
		return identification;
	}
	public void setIdentification(String identification) {
		this.identification = identification;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSecondName() {
		return secondName;
	}
	public void setSecondName(String secondName) {
		this.secondName = secondName;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getSecondSurname() {
		return secondSurname;
	}
	public void setSecondSurname(String secondSurname) {
		this.secondSurname = secondSurname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDateBirth() {
		return dateBirth;
	}
	public void setDateBirth(String dateBirth) {
		this.dateBirth = dateBirth;
	}
	public String getHomeAddress() {
		return homeAddress;
	}
	public void setHomeAddress(String homeAddress) {
		this.homeAddress = homeAddress;
	}
	public String getMobilePhone() {
		return mobilePhone;
	}
	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
	}
	public String getVaccinationStatus() {
		return vaccinationStatus;
	}
	public void setVaccinationStatus(String vaccinationStatus) {
		this.vaccinationStatus = vaccinationStatus;
	}
	public String getTypeVacine() {
		return typeVacine;
	}
	public void setTypeVacine(String typeVacine) {
		this.typeVacine = typeVacine;
	}
	public String getVaccinationDate() {
		return vaccinationDate;
	}
	public void setVaccinationDate(String vaccinationDate) {
		this.vaccinationDate = vaccinationDate;
	}
	public int getDoses() {
		return doses;
	}
	public void setDoses(int doses) {
		this.doses = doses;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
}
