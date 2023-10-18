const ctx = document.getElementById("main-chart");
var dataFirst = {
  label: "Number of PDB",
  data: [314, 417, 486, 362, 483, 597],
  lineTension: 0,
  fill: false,
  // borderColor: "rgb(100, 200, 255)",
  borderColor: "white",
};

var dataSecond = {
  label: "Number of Gene",
  data: [205, 317, 372, 357, 567, 486, 707],
  lineTension: 0,
  fill: false,
  borderColor: "rgb(180, 280, 255)",
};

var speedData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [dataFirst, dataSecond],
};

var mainChartOptions = {
  plugins: {
    title: {
      display: true,
      text: "구조 정보 업데이트 현황",
      color: "white",
    },
    legend: {
      display: true,
      labels: {
        fontColor: "black",
        color: "white",
      },
    },
  },
  scales: {
    y: {
      ticks: { color: "white", beginAtZero: true },
    },
    x: {
      ticks: { color: "white" },
    },
  },
};

var lineChart = new Chart(ctx, {
  type: "line",
  data: speedData,
  options: mainChartOptions,
});

// Load RCSB released csv data
$.ajax({
  url: "https://raw.githubusercontent.com/JeongSooNa/1700T_model_dev/main/html/data/RCSB_released_2023_total.csv",
  dataType: "text",
}).done(successFunction);
// Column
/* 
  0. EntryID
  1. Date
  2. Ligand
  3. Value
  4. Symbol
  5. Type
  6. Unit
  7. PDBID
  8. Title
  9. StructureTitle
  10. StuctureKeywords
  11. GeneName
  12. ECNumber
  13. AnnotationIdentifier
  14. PolymerEntityID
  15. EntryIdPolymerEntityIdentifiers
  16. TargetProtein
  17. AccessionCode
  18. DatabaseName
  19. LigandFormula
  20. LigandMW
  21. LigandID
  22. LigandName
  23. LigandSMILES
  24. NonPolymerEntityID
*/
function successFunction(data) {
  // console.log("Load Data Complete!")
  // console.log(data)
  var colList = data.split("\n");
  var len = colList.length;
  var column = colList[0].split(",");

  // console.log(column);
  // console.log(len);
  // console.log(colList[1]);
  // console.log(colList[2].split(",")[0])

  // type checkbox
  $("#wild").click(function () {
    $("#mutant").prop("checked", false);
  });
  $("#mutant").click(function () {
    $("#wild").prop("checked", false);
  });

  // Load table
  function loadTable() {
    // table clear
    $("#rrd-data-data tbody *").remove();
    // load data
    var html = "";
    for (var i = 1; i < 523; i++) {
      // for (var i = 1; i < 100; i++) {
      var search = $("#search-inp").val();
      /*
      var search = $("#search-inp");
      var searchVal = "";
      if (search) {
        searchVal = search.val();
      }
      */
      if (search != "") {
        if (
          !(
            colList[i].split(",")[11].includes(search) ||
            colList[i].split(",")[17].includes(search)
          )
        ) {
          continue;
        }
      }

      // append table content
      if (
        $("#wild").is(":checked") &&
        colList[i].split(",")[16].toLowerCase() != "wildtype"
      ) {
        continue;
      }
      if (
        $("#mutant").is(":checked") &&
        colList[i].split(",")[16].toLowerCase() != "mutant"
      ) {
        continue;
      }

      // choose month



      html +=
        "<tr><td>" +
        colList[i].split(",")[0] + // PDB
        "</td><td>" +
        colList[i].split(",")[11] + // Gene Name
        "</td><td>" +
        colList[i].split(",")[16] + // Mutant Type
        "</td><td>" +
        colList[i].split(",")[17] + // Uniprot ID
        "</td><td>" +
        colList[i].split(",")[22] + // Ligand
        "</td><td>" +
        colList[i].split(",")[20] + // Ligand MW
        "</td></tr>";
    }
    $("#rrd-data-data tbody").append(html);
  }
  loadTable();

  //click search button
  $("#search-btn").click(function () {
    loadTable();
  });
}

// Q&A click function
function QnAOpenPopup() {
  $(".QnA-popup").show(20);
  $(".QnA-hide").show(20);
  $(".QnA").css({
    width: "500px",
    overflow: "visible",
    "border-radius": "5px",
  });
}
function QnAOpenPopupClose() {
  $(".QnA-popup").hide(20);
  $(".QnA-hide").hide(20);
  $(".QnA").css({
    width: "240px",
    overflow: "hidden",
    "border-radius": "5px",
  });
}
function submit() {
  //

  var confirmFlag = confirm("Q&A를 등록하시겠습니까?");
  if (confirmFlag) {
    alert("등록 완료");
  } else {
  }
}

// Chart Section
// Chart 1
const ctx1 = document.getElementById("chart-1");
const mixedChart = new Chart(ctx1, {
  data: {
    datasets: [
      {
        type: "line",
        label: "1700T 중복 Gene",
        data: [65, 71, 84, 87, 82, 85, 72],
        borderColor: "#FF6384",
        // backgroundColor: '#9BD0F5',
        // borderColor: 'rgb(54, 162, 235)'
      },
      {
        type: "bar",
        label: "Gene",
        data: [205, 317, 372, 357, 567, 486, 707],
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      },
    ],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "1700T 중복 Gene",
        color: "white",
      },
      legend: {
        display: true,
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      y: {
        ticks: { color: "white", beginAtZero: true },
      },
      x: {
        ticks: { color: "white", beginAtZero: true },
      },
    },
  },
});
// Chart 2
const ctx2 = document.getElementById("chart-2");
const mixedChart2 = new Chart(ctx2, {
  data: {
    datasets: [
      {
        type: "bar",
        label: "Gene",
        data: [107, 161, 146, 125, 233, 162, 176],
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      },
    ],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "1700T 미중복 Apo Protein 제외 PDB",
        color: "white",
      },
      legend: {
        display: false,
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      y: {
        ticks: { color: "white", beginAtZero: true },
      },
      x: {
        ticks: { color: "white", beginAtZero: true },
      },
    },
  },
});
// Chart 4
const ctx4 = document.getElementById("chart-4");
const mixedChart4 = new Chart(ctx4, {
  data: {
    datasets: [
      {
        type: "bar",
        data: [977, 14, 255, 147, 305],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(201, 203, 207, 0.5)",
        ],
      },
    ],
    labels: ["Kinase", "Methylase", "Peptease", "Protease", "ect"],
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: "Family별 Update 된 PDB",
        color: "white",
      },
      legend: {
        display: false,
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      y: {
        ticks: { color: "white", beginAtZero: true },
      },
      x: {
        ticks: { color: "white", beginAtZero: true },
      },
    },
  },
});
// popup open, close
function openChart1() {
  $(".chart-1").show(10);
  $(".chart-2").hide(10);
  $(".chart-3").hide(10);
  $(".chart-4").hide(10);
}
function openChart2() {
  $(".chart-2").show(10);
  $(".chart-1").hide(10);
  $(".chart-3").hide(10);
  $(".chart-4").hide(10);
}
function openChart3() {
  $(".chart-3").show(10);
  $(".chart-1").hide(10);
  $(".chart-2").hide(10);
  $(".chart-4").hide(10);
}
function openChart4() {
  $(".chart-4").show(10);
  $(".chart-1").hide(10);
  $(".chart-2").hide(10);
  $(".chart-3").hide(10);
}
function Chart1Close() {
  $(".chart-1").hide();
}
function Chart2Close() {
  $(".chart-2").hide();
}
function Chart3Close() {
  $(".chart-3").hide();
}
function Chart4Close() {
  $(".chart-4").hide();
}


// Download select event

// a tag를 change?
$("#select-data").on("change", function(){
  var changedVal = $("option:selected", this).text();
  console.log(changedVal)
  if(changedVal == 'All Data'){
    $("#downloadCsv").prop("href","./data/RCSB_released_2023_total.csv")
  }
  if(changedVal == 'Jan 2023'){
    $("#downloadCsv").prop("href","./data/RCSB_released_2023_1.csv")
  }
  if(changedVal == 'Feb 2023'){
    $("#downloadCsv").prop("href","./data/RCSB_released_2023_2.csv")
  }
  if(changedVal == 'Mar 2023'){
    $("#downloadCsv").prop("href","./data/RCSB_released_2023_3.csv")
  }
  if(changedVal == 'Apr 2023'){
    $("#downloadCsv").prop("href","./data/RCSB_released_2023_4.csv")
  }
  if(changedVal == 'May 2023'){
    $("#downloadCsv").prop("href","./data/RCSB_released_2023_5.csv")
  }
  if(changedVal == 'Jun 2023'){
    $("#downloadCsv").prop("href","./data/RCSB_released_2023_6.csv")
  }
});



// Optoin tag에서 onclick 이 안되는 관계로 수정 필요.
// function selectDownAll(){
//   $("#downloadCsv").href = "./data/RCSB_released_2023_total.csv"
//   alert("!")
// }


