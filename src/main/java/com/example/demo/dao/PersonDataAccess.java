package com.example.demo.dao;

import com.example.demo.model.Person;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository("postgres")
public class PersonDataAccess implements PersonDao {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    PersonDataAccess(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public int insertPerson(UUID id, Person person) {
        return 0;
    }

    @Override
    public List<Person> getPersons() {
        return jdbcTemplate.query("SELECT * FROM person", (resultSet, i) -> {
            return new Person(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getString("name"));
        });
    }

    @Override
    public int deletePerson(UUID id) {
        return 0;
    }

    @Override
    public Person getPerson(UUID id) {
        return null;
    }

    @Override
    public int updatePerson(UUID id, Person person) {
        return 0;
    }

    @Override
    public int insertPerson(Person person) {
        return PersonDao.super.insertPerson(person);
    }
}
