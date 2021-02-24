export function ExperienceBar(){
  return(
    <header className='experience-bar'>
      <span>0 xp</span>
      <div>
        <div style={{width: '60%'}} />

        <span className='current-experience' style={{left:'60%'}} >360xp</span>
      </div>
      <span>600 xp</span>
    </header>
  );
}