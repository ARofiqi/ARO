$(document).ready(function () {
  const dataProject = [
    {
      title: "Koperasi Bahagia",
      desc: "Sebuah webapp yang diperuntukan untuk koperasi dalam mengelola barang yang ada didalam gudang",
      image: "",
    },
  ];

  const dataSkill = ["javascript", "html5", "css", "expressJS", "nodeJS"];

  const cardTemplate = (title, desc, image) => {
    return `<div class="card">
        <img src="${image}" alt="" />
        <div>
        <h3>${title}</h3>
        <p>${desc}</p>
      </div>
    </div>`;
  };

  const skillTemplate = (nameSkill) => {
    return `<img src="./src/skill/${nameSkill}.png" alt="${nameSkill}"/>`;
  };

  dataProject.map((d) => $(".list-card").append(cardTemplate(d.title, d.desc, d.image)));
  dataSkill.map((d) => $(".list-skill").append(skillTemplate(d)));

  // fitur rahasia
  $(".feat-1").click(() => {
    $(".feat-1").toggleClass("feat-1-style");
  });
});
