package com.edwin.api.repository;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edwin.api.models.MyUser;

public interface MyUserRepository extends JpaRepository<MyUser, Long> {
	MyUser findByIdentification(String identification);
	Collection<MyUser> findByRole(String role);
	
}
