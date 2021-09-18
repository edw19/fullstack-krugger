package com.edwin.api.rest;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.edwin.api.models.MyUser;
import com.edwin.api.repository.MyUserRepository;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class MyUserREST {

	@Autowired
	private MyUserRepository myUserRepository;
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;

	@GetMapping
	private ResponseEntity<Collection<MyUser>> getAllEmployees() {
		return ResponseEntity.ok(myUserRepository.findByRole("Empleado"));
	}

	@DeleteMapping
	public void deleteUser(@RequestParam(required = true) Long id) {
		myUserRepository.deleteById(id);
	}

	@PutMapping
	public void updateUser(@RequestBody InputUser user) {

		MyUser us = myUserRepository.findByIdentification(user.getIdentification());

		// update credentials
		us.setIdentification(user.getIdentification());
		if(user.getPassword() != null) {
			if(user.getPassword().length() > 0) {
				if(user.getPassword().startsWith("$")) {
					us.setPassword(us.getPassword());
				}else {
					us.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));												
				}
			}
		}
		us.setName(user.getName());
		us.setSecondName(user.getSecondName());
		us.setSurname(user.getSurname());
		us.setSecondName(user.getSecondName());
		us.setEmail(user.getEmail());
		
		us.setDateBirth(user.getDateBirth());
		us.setHomeAddress(user.getHomeAddress());
		us.setMobilePhone(user.getMobilePhone());
		us.setVaccinationStatus(user.getVaccinationStatus());

		us.setTypeVacine(user.getTypeVacine());
		us.setVaccinationDate(user.getVaccinationDate());
		us.setDoses(user.getDoses());

		myUserRepository.save(us);
	}

}

class InputUser {
	private String identification;
	private String password;

	private String name;
	private String secondName;
	private String surname;
	private String secondSurname;
	private String email;
	
	private String dateBirth;
	private String homeAddress;
	private String mobilePhone;
	private String typeVacine;
	private String vaccinationDate;
	private String vaccinationStatus;
	private int doses;

	
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

	public int getDoses() {
		return doses;
	}

	public void setDoses(int doses) {
		this.doses = doses;
	}

	public String getIdentification() {
		return identification;
	}

	public void setIdentification(String identification) {
		this.identification = identification;
	}

	public String getHomeAddress() {
		return homeAddress;
	}

	public void setHomeAddress(String homeAddress) {
		this.homeAddress = homeAddress;
	}

	public String getDateBirth() {
		return dateBirth;
	}

	public void setDateBirth(String dateBirth) {
		this.dateBirth = dateBirth;
	}

	public String getMobilePhone() {
		return mobilePhone;
	}

	public void setMobilePhone(String mobilePhone) {
		this.mobilePhone = mobilePhone;
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

	public String getVaccinationStatus() {
		return vaccinationStatus;
	}

	public void setVaccinationStatus(String vaccinationStatus) {
		this.vaccinationStatus = vaccinationStatus;
	}

}
