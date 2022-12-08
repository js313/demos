package com.example.demo.service;

import com.example.demo.dao.PersonDao;
import com.example.demo.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PersonService {
    private final PersonDao personDao;

    @Autowired
        public PersonService(@Qualifier("postgres") PersonDao personDao) {
        this.personDao = personDao;
    }
    public int addPerson(Person person) {
        personDao.insertPerson(person);
        return 1;
    }

    public List<Person> getPersons() {
        return personDao.getPersons();
    }

    public int deletePerson(UUID id) {
        return personDao.deletePerson(id);
    }

    public Person getPerson(UUID id) {
        return personDao.getPerson(id);
    }

    public int updatePerson(UUID id, Person newPerson) {
        return personDao.updatePerson(id, newPerson);
    }
}
