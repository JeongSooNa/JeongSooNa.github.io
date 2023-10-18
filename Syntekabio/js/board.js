window.onload=function(){
  console.log("Model of DeepMatcher")
}

$(".container").append("<h1>asdasdasd</h1>")

// move popup
$(function () {
  $(".data-popup").draggable();
});
// Loading function
window.onload=function(){
  $(".main").css("display", "block");
  $(".loading").css("display", "none");
}
// setTimeout(function () {
  // $(".main").css("display", "block");
  // $(".loading").css("display", "none");
// }, 3000); // loading time setting

// Hide option
$("#hide").click(function () {
  if ($("#hide").text() == "▶  open") {
    $(".option-wrapper").css("display", "block");
    $(".main-wrapper").css("width", "80%");
    $("#hide").text("◀  close");
  } else {
    $(".option-wrapper").css("display", "none");
    $(".main-wrapper").css("width", "95%");
    $("#hide").text("▶  open");
  }
});

// popup
$(".popup-close").click(function () {
  $(".data-popup").css("display", "none");
  $(".popup-body").css("display", "none");
});

// Option checkbox
$("#FamilyKinase").click(function () {
  if ($("#FamilyKinase").is(":checked")) {
    $("#FamilyPeptidase").prop("checked", false);
    $("#FamilyOthers").prop("checked", false);
  }
});
$("#FamilyPeptidase").click(function () {
  if ($("#FamilyPeptidase").is(":checked")) {
    $("#FamilyKinase").prop("checked", false);
    $("#FamilyOthers").prop("checked", false);
  }
});
$("#FamilyOthers").click(function () {
  if ($("#FamilyOthers").is(":checked")) {
    $("#FamilyKinase").prop("checked", false);
    $("#FamilyPeptidase").prop("checked", false);
  }
});
$("#FunctionAgonist").click(function () {
  if ($("#FunctionAgonist").is(":checked")) {
    $("#FunctionAntagonist").prop("checked", false);
    $("#FunctionOthers").prop("checked", false);
  }
});
$("#FunctionAntagonist").click(function () {
  if ($("#FunctionAntagonist").is(":checked")) {
    $("#FunctionAgonist").prop("checked", false);
    $("#FunctionOthers").prop("checked", false);
  }
});
$("#FunctionOthers").click(function () {
  if ($("#FunctionOthers").is(":checked")) {
    $("#FunctionAgonist").prop("checked", false);
    $("#FunctionAntagonist").prop("checked", false);
  }
});
$("#TypeWild").click(function () {
  if ($("#TypeWild").is(":checked")) {
    $("#TypeMutant").prop("checked", false);
  }
});
$("#TypeMutant").click(function () {
  if ($("#TypeMutant").is(":checked")) {
    $("#TypeWild").prop("checked", false);
  }
});

// Read csv file
$.ajax({
  url: "https://raw.githubusercontent.com/JeongSooNa/1700T_model_dev/main/html/data/1700T_raw_final.csv",
  dataType: "text",
}).done(successFunction);
//   console.log(data);
// Column
/*
      0. Gene(1700T)                  2. UniProtID *
      1. PDB                                  4. ProteinName *
      2. UniProtID *                  5. Type *
      3. tempFlag                             8. LIG *
      4. ProteinName *                10. PDB *
      5. Type *                               12. STB-Cloud Class *
      6. Cluster                              13. Replaced *
      7. ModelPDB                             15. ModelActionMode
      8. LIG *                                18. Family *
      9. Lig Suggested        29. NOfTrials *
      10. PDB *
      11. Replaced
      12. STB-Cloud Class *
      13. Replaced *
      14. Title
      15. ModelActionMode
      16. AllostericOrthostericETC
      17. isAssay
      18. Family *
      19. Subfamily
      20. Class
      21. CRO1
      22. AssayType1
      23. ModeOfAssay1
      24. CRO2
      25. AssayType2
      26. ModeOfAssay2
      27. ModelCount
      28. internalScreening
      29. NOfTrials *
      30. AtopicDermatitisPsoriasisAsthma
      31. AtopicDermatitisPsoriasisAsthma
      32. DiabeticNephropathy
      */

function successFunction(data) {
  var colList = data.split("\n");
  var len = colList.length;
  var column = colList[0].split(",");
  console.log(column);
  console.log(len);
  console.log(colList[3]);
  function loadTable() {
    // table clear
    $("#data-tbody *").remove();
    // load data
    var html = "";
    //for (var i = 1; i < 100; i++) {
    for (var i = 1; i < len; i++) {
      // filtering
      var search = $(".search-bar input").val();
      if (search != "") {
        if (
          !(
            colList[i].split(",")[2].includes(search) ||
            colList[i].split(",")[4].includes(search)
          )
        ) {
          continue;
        }
      }
      // Include Family Kinase
      if ($("#FamilyKinase").is(":checked")) {
        if (!colList[i].split(",")[18].includes("Kinase")) {
          continue;
        }
      }
      // Include Family Peptidase
      if ($("#FamilyPeptidase").is(":checked")) {
        if (!colList[i].split(",")[18].includes("Peptidase")) {
          continue;
        }
      }
      // Include Family Others
      if ($("#FamilyOthers").is(":checked")) {
        if (colList[i].split(",")[18].includes("Kinase")) {
          continue;
        }
        if (colList[i].split(",")[18].includes("Peptidase")) {
          continue;
        }
      }
      // Include Function Agonist
      if ($("#FunctionAgonist").is(":checked")) {
        if (!colList[i].split(",")[15].includes("ctivator")) {
          continue;
        }
      }
      // Include Function Antagonist
      if ($("#FunctionAntagonist").is(":checked")) {
        if (!colList[i].split(",")[15].includes("nhibitor")) {
          continue;
        }
      }
      // Include Function Others
      if ($("#FunctionOthers").is(":checked")) {
        if (colList[i].split(",")[15].includes("ctivator")) {
          continue;
        }
        if (colList[i].split(",")[15].includes("nhibitor")) {
          continue;
        }
      }

      // Include Type wild
      if ($("#TypeWild").is(":checked")) {
        if (!colList[i].split(",")[5].includes("wild")) {
          continue;
        }
      }
      // Include Type mutant
      if ($("#TypeMutant").is(":checked")) {
        if (colList[i].split(",")[5].includes("wild")) {
          continue;
        }
      }

      // append table content
      html +=
        "<tr><td>" +
        i + // ID
        "</td><td>" +
        colList[i].split(",")[2] + // Uniprot ID
        "</td><td>" +
        colList[i].split(",")[4] + // Protein Name
        "</td><td>" +
        colList[i].split(",")[5] + // Type
        "</td><td>" +
        colList[i].split(",")[8] + // LIG
        "</td><td>" +
        colList[i].split(",")[10] + // PDB
        "</td><td>" +
        colList[i].split(",")[15] + // Model Action Mode
        "</td><td>" +
        colList[i].split(",")[18] + // Family
        "</td></tr>";
    }
    $("#data-tbody").append(html);
  }
  loadTable();

  $("#search-btn").click(function () {
    loadTable();
  });

  $(document).on("click", "tr", function () {
    // Get index
    var text = $(this).text().slice(0, 4);
    var index = "";
    var pattern_n = /[0-9]/; // number regulation
    for (var i = 0; i < 4; i++) {
      if (pattern_n.test(text[i])) {
        index = index + text[i];
      } else {
        break;
      }
    }
    // console.log(index)
    var index_n = Number(index);
    // console.log(index_n);
    $(".data-popup").css("display", "block");
    $(".popup-loading").css("display", "block");
    setTimeout(function () {
      $(".popup-body").css("display", "block");
      $(".popup-loading").css("display", "none");
    }, 1000);

    // link & download PDB
    $("#goRCSB").attr(
      "href",
      "https://www.rcsb.org/structure/" + colList[index_n].split(",")[10]
    );
    $("#goUniprot").attr(
      "href",
      "https://www.uniprot.org/uniprotkb/" +
        colList[index_n].split(",")[2] +
        "/entry"
    );
    $("#getPDB").attr(
      "href",
      "https://files.rcsb.org/download/" +
        colList[index_n].split(",")[10] +
        ".pdb"
    );
    $("#popUniProtID").val(colList[index_n].split(",")[2]);
    $("#popProteinName").val(colList[index_n].split(",")[4]);
    $("#popType").val(colList[index_n].split(",")[5]);
    $("#popLIG").val(colList[index_n].split(",")[8]);
    $("#popPDB").val(colList[index_n].split(",")[10]);
    $("#popModelActionMode").val(colList[index_n].split(",")[15]);
    $("#popFamily").val(colList[index_n].split(",")[18]);
    $("#popCluster").val(colList[index_n].split(",")[6]);
    $("#popSTBCloudClass").val(colList[index_n].split(",")[12]);
    $("#popReplaced").val(colList[index_n].split(",")[11]);
    $("#popNOfTrials").val(colList[index_n].split(",")[29]);
    $("#popAtopicDermatitisPsoriasisAsthma").val(
      colList[index_n].split(",")[30]
    );
    $("#popRheumatoidArthritis").val(colList[index_n].split(",")[31]);
    $("#popDiabeticNephropathy").val(colList[index_n].split(",")[32]);
  });
}
