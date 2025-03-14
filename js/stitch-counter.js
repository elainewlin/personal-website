const storageKey = "stitchCounter";
const storedData = localStorage.getItem(storageKey) || "[]";
const sectionData = JSON.parse(storedData);

let currentSection = sectionData[0];
rerender();

function findSection(name) {
  return sectionData.find(s => s.name === name);
}

function updateLocalStorage() {
  localStorage.setItem(storageKey, JSON.stringify(sectionData));
}

function addRow() {
  if (currentSection.stitchCount === 0) {
    window.alert("No stitches in row - increment Stitch count first.");
    return;
  }
  const newRowCount = currentSection.rowCount + 1;
  currentSection.history.push({
    rowCount: newRowCount,
    stitchCount: currentSection.stitchCount
  });
  currentSection.rowCount = newRowCount;
  currentSection.stitchCount = 0;
  updateLocalStorage();
  rerender();
}

function subtractRow() {
  const newRowCount = currentSection.rowCount - 1;
  if (newRowCount < 0) return;
  currentSection.history.pop();

  currentSection.rowCount = newRowCount;
  updateLocalStorage();
  rerender();
}

function updateStitch(amount) {
  const newStitchCount = currentSection.stitchCount + amount;
  if (newStitchCount < 0) return;
  currentSection.stitchCount = newStitchCount;
  updateLocalStorage();
  rerender();
}

function deleteSection() {
  const areYouSureText =
    `Are you sure you want to delete the section: ${currentSection.name}?\n\n` +
    "This will delete all your progress for the section.";
  if (!confirm(areYouSureText)) return;

  const index = sectionData.findIndex(s => s.name === currentSection.name);
  sectionData.splice(index, 1);
  currentSection = sectionData[0];
  updateLocalStorage();
  rerender();
}

$("#newSectionForm").submit(function(e) {
  const sectionName = $("#sectionName").val();
  if (!sectionName) {
    window.alert("Please enter a section name.");
    return;
  }
  if (findSection(sectionName)) {
    window.alert("Please enter a unique section name.");
    return false;
  }

  const newSection = {
    name: sectionName,
    rowCount: 0,
    stitchCount: 0,
    history: []
  };
  sectionData.push(newSection);
  currentSection = newSection;
  updateLocalStorage();
  rerender();

  $("#sectionName").val("");
  return false;
});

$(document).on("click", ".section-name", function() {
  const rowInd = $(this).attr("data-ind");
  const section = sectionData[rowInd];
  currentSection = section;
  rerender();
});

function renderInfoText() {
  if (currentSection) {
    $("#infoText").hide();
  } else {
    $("#infoText").show();
  }
}

function renderCurrentSection() {
  if (!currentSection) {
    return;
  }

  $("#currentSectionName").text(currentSection.name);
  $("#sectionToDelete").text(currentSection.name);
  $("#rowCount").text(currentSection.rowCount);
  $("#stitchCount").text(currentSection.stitchCount);
}

function formatHistory(history) {
  return history
    .map(entry => {
      return `Row ${entry.rowCount}: ${entry.stitchCount} stitches `;
    })
    .join("<br>");
}

function renderSectionTableRow(section, ind) {
  const nameCol = `
    <td class="section-name" data-ind=${ind}>
      <span class="section-name-button">
        ${section.name}
      </span>
    </td>
  `;

  const historyCol = `
    <td>
      ${formatHistory(section.history)}
    </td>
  `;

  const columns = nameCol + historyCol;
  return `<tr>${columns}</tr>`;
}

function renderSectionTable() {
  if (sectionData.length === 0) {
    $("#currentSection").hide();
    $(".overview-section").hide();
    return;
  }
  $("#currentSection").show();
  $(".overview-section").show();
  const tableRows = sectionData
    .map((section, ind) => {
      return renderSectionTableRow(section, ind);
    })
    .join();
  $("#sectionTable")
    .find("tbody")
    .html(tableRows);
}

function rerender() {
  renderInfoText();
  renderCurrentSection();
  renderSectionTable();
}
