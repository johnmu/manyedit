package com.umnhoj.manyedit.controller;

import com.umnhoj.manyedit.data.EditBlock;
import org.bitbucket.cowwoc.diffmatchpatch.DiffMatchPatch;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.Objects;
import java.util.Optional;

@RestController
public class ManyEditController {
    private static String currString = ""; // Our super fast in-memory "database"

    static DiffMatchPatch dmp = new DiffMatchPatch();

    @RequestMapping(method = RequestMethod.POST, value = "/api/edit")
    public synchronized ResponseEntity<EditBlock> edit(@RequestBody EditBlock edit) {
        if (edit == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (edit.getEdited() == null ^ edit.getOriginal() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        final String edited = edit.getEdited().substring(0,1000); // after trimming

        // Compute patches and update
        if (!Objects.equals(edited, edit.getOriginal())) {
            // not equals, need to compute patch
            Optional<LinkedList<DiffMatchPatch.Patch>> patches = Optional.of(dmp.patchMake(edit.getOriginal(), edited));
            currString = (String) dmp.patchApply(patches.get(), currString)[0];
        }

        // Compute new cursor positions
        final int start;
        final int end;
        if(edit.getOriginal() != null){
            final LinkedList<DiffMatchPatch.Diff> diffs = dmp.diffMain(edited, currString);
            start = dmp.diffXIndex(diffs, edit.getSelectionStart());
            end = dmp.diffXIndex(diffs, edit.getSelectionEnd());
        }else{
            start = edit.getSelectionStart();
            end = edit.getSelectionEnd();
        }

        return new ResponseEntity<>(new EditBlock(edited, currString, start, end), HttpStatus.OK);
    }
}
