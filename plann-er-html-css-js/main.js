const activities = [
  {
    name: "Academia em grupo",
    date: new Date("2024-07-09 08:00"),
    completed: false,
  },
  {
    name: "Almoço",
    date: new Date("2024-07-09 12:30"),
    completed: false,
  },
  {
    name: "Reunião de planejamento",
    date: new Date("2024-07-09 14:30"),
    completed: false,
  },
  {
    name: "Atendimento ao cliente",
    date: new Date("2024-07-09 16:00"),
    completed: false,
  },
  {
    name: "Análise de dados",
    date: new Date("2024-07-10 09:00"),
    completed: false,
  },
  {
    name: "Preparação da apresentação",
    date: new Date("2024-07-10 11:00"),
    completed: false,
  },
  {
    name: "Apresentação da equipe",
    date: new Date("2024-07-10 14:00"),
    completed: false,
  },
  {
    name: "Revisão da documentação",
    date: new Date("2024-07-11 09:30"),
    completed: false,
  },
  {
    name: "Treinamento de ferramentas",
    date: new Date("2024-07-11 13:30"),
    completed: false,
  },
  {
    name: "Brainstorming de ideias",
    date: new Date("2024-07-12 10:00"),
    completed: false,
  },
];

function createActivityItem(activity) {
  let input = "<input type='checkbox' ";

  if (activity.completed) {
    input += "checked";
  }

  input += ">";

  return `
  <div>
    ${input}
    <span>${activity.name}</span>
    <time>${activity.date}</time>
  </div>
  `;
}

const section = document.querySelector("section");

for (let activity of activities) {
  section.innerHTML += createActivityItem(activity);
}
