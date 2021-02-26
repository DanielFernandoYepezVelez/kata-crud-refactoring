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
    private static final String MENSAJE = "mensaje";
    private static final Map<String, Object> RESPONSE = new HashMap<>();

    @Autowired
    private TodoService service;

    @GetMapping("/todos")
    public List<Todo> list(){
        return service.list();
    }
    
    @PostMapping("/todo")
    public ResponseEntity<Map<String, Object>> save(@RequestBody Todo todo) {
        Todo nuevoTodo = null;

        try {
            nuevoTodo = service.save(todo);
        } catch (DataAccessException e) {
            RESPONSE.put(MENSAJE, "Error En La Consulta O Query Por Que Los Nombres No Coinciden");
            RESPONSE.put("error", Objects.requireNonNull(e.getMessage()).concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(RESPONSE, HttpStatus.BAD_REQUEST);
        }

        RESPONSE.put(MENSAJE, "La Tarea Fue Creada Exitosamente!");
        RESPONSE.put("todo", nuevoTodo);
        return new ResponseEntity<>(RESPONSE, HttpStatus.CREATED);
    }

    @PutMapping("/todo/{id}")
    public ResponseEntity<Map<String, Object>> update(@RequestBody Todo todo, @PathVariable Long id){
        Todo todoActualizado = null;
        Todo todoDB = service.get(id);

        if (todoDB == null) {
            RESPONSE.put(MENSAJE, "Error, No Se Puede Editar La Tarea ID: ".concat(id.toString().concat(" No Existe!")));
            return new ResponseEntity<>(RESPONSE, HttpStatus.NOT_FOUND);
        }

        try {
            todoDB.setName(todo.getName());
            todoDB.setCompleted(todo.isCompleted());
            todoActualizado = service.save(todoDB);
        } catch (DataAccessException e) {
            RESPONSE.put(MENSAJE, "Error En La Consulta O Query Por Que Los Nombres No Coinciden");
            RESPONSE.put("error", Objects.requireNonNull(e.getMessage()).concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(RESPONSE, HttpStatus.BAD_REQUEST);
        }

        RESPONSE.put(MENSAJE, "La Tarea Fue Actualizada Exitosamente!");
        RESPONSE.put("todo", todoActualizado);
        return new ResponseEntity<>(RESPONSE, HttpStatus.CREATED);
    }

    @DeleteMapping("/todo/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        Todo todoDB = service.get(id);
        Map<String, Object> responseDelete = new HashMap<>();

        if (todoDB == null) {
            responseDelete.put(MENSAJE, "Error, No Se Puede Editar La Tarea ID: ".concat(id.toString().concat(" No Existe!")));
            return new ResponseEntity<>(responseDelete, HttpStatus.NOT_FOUND);
        }

        try {
            service.delete(todoDB.getId());
        } catch (DataAccessException e) {
            responseDelete.put(MENSAJE, "Error En La Consulta O Query Por Integridad Referencial");
            responseDelete.put("error", Objects.requireNonNull(e.getMessage()).concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(responseDelete, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        responseDelete.put(MENSAJE, "La Tarea Fue Eliminada Exitosamente!");
        return new ResponseEntity<>(responseDelete, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}/todo")
    public Todo get(@PathVariable("id") Long id){
        return service.get(id);
    }
}
