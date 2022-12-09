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
        jdbcTemplate.execute("INSERT INTO person (id, name) VALUES(\'"+id+"\',\'"+person.getName()+"\')");
        return 1;
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
        List<Person> persons = jdbcTemplate.query(
                "DELETE FROM person WHERE id=\'"+id.toString()+"\' RETURNING *",
                (resultSet, i) -> {
                    return new Person(
                            UUID.fromString(resultSet.getString("id")),
                            resultSet.getString("name")
                    );
                });
        if(persons.size() < 1) return 1;
        return 0;
    }

    @Override
    public Person getPerson(UUID id) {
        return jdbcTemplate.query(("SELECT * FROM person WHERE id = \'" + id.toString() + "\'"), (resultSet, i) -> {
            return new Person(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getString("name")
            );
        }).get(0);
    }

    @Override
    public int updatePerson(UUID id, Person person) {
        jdbcTemplate.execute(
                "UPDATE person SET id=\'"+person.getId()+"\', name=\'"+person.getName()+
                        "\' WHERE id=\'"+id.toString()+"\'");
        return 0;
    }
}
