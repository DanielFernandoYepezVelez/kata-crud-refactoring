package co.com.sofka.crud.controllers;

import co.com.sofka.crud.models.Todo;
import co.com.sofka.crud.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class TodoController {
    @Autowired
    private TodoService service;

    @GetMapping("/todos")
    public List<Todo> list(){
        return service.list();
    }
    
    @PostMapping("/todo")
    public ResponseEntity<Map<String, Object>> save(@RequestBody Todo todo) {
        Map<String, Object> response = new HashMap<>();
        Todo nuevoTodo = null;

        try {
            nuevoTodo = service.save(todo);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error En La Consulta O Query Por Que Los Nombres No Coinciden");
            response.put("error", Objects.requireNonNull(e.getMessage()).concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        response.put("mensaje", "La Tarea Fue Creada Exitosamente!");
        response.put("todo", nuevoTodo);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/todo/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody Todo todo, @PathVariable Long id){
        Map<String, Object> response = new HashMap<>();
        Todo todoActualizado = null;
        Todo todoDB = service.get(id);

        if (todoDB == null) {
            response.put("mensaje", "Error, No Se Puede Editar La Tarea ID: ".concat(id.toString().concat(" No Existe!")));
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        try {
            todoDB.setName(todo.getName());
            todoDB.setCompleted(todo.isCompleted());
            todoActualizado = service.save(todoDB);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error En La Consulta O Query Por Que Los Nombres No Coinciden");
            response.put("error", Objects.requireNonNull(e.getMessage()).concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }

        response.put("mensaje", "La Tarea Fue Actualizada Exitosamente!");
        response.put("todo", todoActualizado);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("/todo/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        Todo todoDB = service.get(id);

        if (todoDB == null) {
            response.put("mensaje", "Error, No Se Puede Editar La Tarea ID: ".concat(id.toString().concat(" No Existe!")));
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }

        try {
            service.delete(todoDB.getId());
        } catch (DataAccessException e) {
            response.put("mensaje", "Error En La Consulta O Query Por Integridad Referencial");
            response.put("error", Objects.requireNonNull(e.getMessage()).concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "La Tarea Fue Eliminada Exitosamente!");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}/todo")
    public Todo get(@PathVariable("id") Long id){
        return service.get(id);
    }
}
