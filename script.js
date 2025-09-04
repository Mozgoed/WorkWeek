const template = [" ", " ", " ", "д", "д", " ", "н", "н"];
const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const months = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

window.onload = showMonthlySchedules;

function showMonthlySchedules() {
  const startDate = new Date("2025-08-05");
  const wrapper = document.getElementById("calendarWrapper");
  wrapper.innerHTML = "";

  const firstMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
  const secondMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
  const thirdMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 2, 1);
  const fourthMonth = new Date(startDate.getFullYear(), startDate.getMonth() + 3, 1);

  wrapper.appendChild(generateMonthTable(firstMonth, startDate));
  wrapper.appendChild(generateMonthTable(secondMonth, startDate));
  wrapper.appendChild(generateMonthTable(thirdMonth, startDate));
  wrapper.appendChild(generateMonthTable(fourthMonth, startDate));
}

function generateMonthTable(monthStartDate, templateStartDate) {
  const year = monthStartDate.getFullYear();
  const month = monthStartDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const table = document.createElement("table");
  const caption = document.createElement("caption");
  caption.className = "month-title";
  caption.innerText = `${months[month]} ${year}`;
  table.appendChild(caption);

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  weekdays.forEach(day => {
    const th = document.createElement("th");
    th.innerText = day;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  let row = document.createElement("tr");

  let firstDay = new Date(year, month, 1).getDay();
  if (firstDay === 0) firstDay = 7;

  for (let i = 1; i < firstDay; i++) {
    row.appendChild(document.createElement("td"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month, day);
    const cell = document.createElement("td");
    const diffDays = Math.floor((currentDate - templateStartDate) / 86400000);
    const templateIndex = ((diffDays % template.length) + template.length) % template.length;
    const shift = template[templateIndex];
    const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
    cell.className = isWeekend ? "weekend" : "";
    cell.innerHTML = `<div>${day}</div><div><strong>${shift}</strong></div>`;
    row.appendChild(cell);

    if ((currentDate.getDay() === 0)) {
      tbody.appendChild(row);
      row = document.createElement("tr");
    }
  }

  if (row.children.length > 0) {
    while (row.children.length < 7) {
      row.appendChild(document.createElement("td"));
    }
    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  return table;
}

