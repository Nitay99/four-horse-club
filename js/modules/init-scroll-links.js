const initScrollLinks = () => {
  const btnSupport = document.getElementById('btn-support');
  const btnTournament = document.getElementById('btn-tournament');

  btnSupport && btnSupport.addEventListener('click', (evt) => {
    const sectionMeetSupport = document.getElementById('meet-support');
    evt.preventDefault();

    sectionMeetSupport && sectionMeetSupport.scrollIntoView({behavior: "smooth"});
  });

  btnTournament && btnTournament.addEventListener('click', (evt) => {
    const sectionAboutTournament = document.getElementById('about-tournament');
    evt.preventDefault();

    sectionAboutTournament && sectionAboutTournament.scrollIntoView({behavior: "smooth"});
  });
};

export {initScrollLinks};
