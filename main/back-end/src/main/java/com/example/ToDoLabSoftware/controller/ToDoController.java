package com.example.ToDoLabSoftware.controller;


import com.example.ToDoLabSoftware.model.ToDo;

import com.example.ToDoLabSoftware.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
    public String viewAllItems(Model model, @ModelAttribute("message") String message) {
        model.addAttribute ("list", service.getAllItems());
        model.addAttribute("msg", message);

        return "ViewList";
    }

    @PostMapping("/updateStatus/{id}")
    public String updateStatus(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        if (service.updateStatus(id)) {
            redirectAttributes.addFlashAttribute("message", "Success");
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
        if (service.save(todo)) {
            redirectAttributes.addFlashAttribute("message", "Save successful");
            return "redirect:/viewList";
        }

        redirectAttributes.addFlashAttribute("message", "Failed to save");
        return "redirect:/AddItem";
    }

    @GetMapping("/editItem/{id}")
    public String editItem(@PathVariable Long id, Model model) {
        model.addAttribute("todo", service.getItemById(id));

        return "EditItem";
    }

    @PostMapping("/editSaveItem")
    public String editSaveItem(ToDo todo, RedirectAttributes redirectAttributes) {
        if (service.save(todo)) {
            redirectAttributes.addFlashAttribute("message", "Edit successful");
            return "redirect:/viewList";
        }

        redirectAttributes.addFlashAttribute("message", "Failed to edit");
        return "redirect:/editItem/" + todo.getId();
    }

    @GetMapping("/deleteItem/{id}")
    public String deleteItem(@PathVariable Long id, RedirectAttributes redirectAttributes) {
        if (service.deleteItem(id)) {
            redirectAttributes.addFlashAttribute("message", "Delete successful");
        } else { // Added else clause to fix logic
            redirectAttributes.addFlashAttribute("message", "Failed to delete");
        }
        return "redirect:/viewList";
    }
}
