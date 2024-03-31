package com.example.ToDoLabSoftware.controller;

import ch.qos.logback.core.model.Model;
import com.example.ToDoLabSoftware.model.ToDo;
import com.example.ToDoLabSoftware.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class ToDoController {

    @Autowired
    private ToDoService service;

    @GetMapping({"/", "viewList"})
    public String viewAllItems(Model model, @ModelAttribute("message") Stirng message) {
        model.addAttribute("list", service.getAllItems());
        model.addAttribute("msg", message);

        return "ViewList";
    }

    @PostMapping("/updateStatus/{id}")
    public String updateStatus(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        if (service.updateStatus(id)) {
            redirectAttributes.addFlashAttribute("message", "Sucess");
            return "redirect:/viewList";
        }
        redirectAttributes.addFlashAttribute("message", "Update failed");
        return "redirect:/viewList";
    }

    @GetMapping("/addItem")
    public String addItem(Model model) {
        model.addAttribute("todo", new ToDo());

        return "AddItem";
    }

    @PostMapping("/saveItem")
    public String saveItem(ToDo todo, RedirectAttributes redirectAttributes) {
        if(service.save(todo)) {

        }
        return "redirect:/AddItem"
    }

    @GetMapping
    public String editItem() {

    }

    @PostMapping
    public String editSaveItem() {

    }

    @GetMapping
    public String deleteItem() {

    }
}
