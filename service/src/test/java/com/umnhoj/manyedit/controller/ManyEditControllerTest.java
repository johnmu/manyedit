package com.umnhoj.manyedit.controller;

import lombok.extern.slf4j.Slf4j;
import org.bitbucket.cowwoc.diffmatchpatch.DiffMatchPatch;
import org.junit.Test;

import java.util.LinkedList;

import static org.junit.Assert.*;

@Slf4j
public class ManyEditControllerTest extends ManyEditController{
    @Test
    public void edit() throws Exception {
        {
            final LinkedList<DiffMatchPatch.Patch> patches = dmp.patchMake("A quick brown fox jumps over the old lazy dog", "A slow brown and black fox jumps over the lazy dog");
            log.info(dmp.patchToText(patches));
        }
        log.info("---------------------------");
        {
            final String str1 = "A quick brown fox";
            final LinkedList<DiffMatchPatch.Patch> patches = dmp.patchMake(str1, "A quick black fox");
            log.info(dmp.patchToText(patches));
            final String output = (String) dmp.patchApply(patches, "A quick blue fox")[0];
            log.info(output);
            LinkedList<DiffMatchPatch.Diff> diffs = dmp.diffMain(str1, output);
            for(int i = 0;i<str1.length();i++){
                System.out.println(i + " -> " + dmp.diffXIndex(diffs,i));
            }
        }

        log.info("---------------------------");
        {
            String str1 = "A quick brown fox";
            final LinkedList<DiffMatchPatch.Patch> patches = dmp.patchMake(str1, "A quick brown and fat fox");
            log.info(dmp.patchToText(patches));
            String output = (String) dmp.patchApply(patches, "A quick blue fox")[0];
            log.info(output);
            LinkedList<DiffMatchPatch.Diff> diffs = dmp.diffMain(str1, output);
            for(int i = 0;i<str1.length();i++){
                System.out.println(i + " -> " + dmp.diffXIndex(diffs,i));
            }
        }

        log.info("---------------------------");
        {
            String str1 = "A quick brown fox";
            final LinkedList<DiffMatchPatch.Patch> patches = dmp.patchMake(str1, "A quick fox");
            log.info(dmp.patchToText(patches));
            String output = (String) dmp.patchApply(patches, "A quick blue fox")[0];
            log.info(output);
            LinkedList<DiffMatchPatch.Diff> diffs = dmp.diffMain(str1, output);
            for(int i = 0;i<str1.length();i++){
                System.out.println(i + " -> " + dmp.diffXIndex(diffs,i));
            }
        }
    }

}