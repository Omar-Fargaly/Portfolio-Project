


function naver(rtnuser)
{
    let namenav = document.getElementById('nav_prof_p');
    let imgnav = document.getElementById('nav_prof_img');
    imgnav.src = rtnuser.uimg_url;
    namenav.textContent = rtnuser.First_Name+ ' ' +rtnuser.Last_Name;
}
function profiler(rtnuser) {
    let prof_img = document.getElementById('profile_id_img');
    let prof_name = document.getElementById('profile_id_name');
    let prof_headline = document.getElementById('profile_id_headline');
    let prof_summary = document.getElementById('profile_id_summary');
    prof_img.src = rtnuser.uimg_url;
    prof_name.textContent = rtnuser.First_Name +' '+rtnuser.Last_Name;
    prof_headline.textContent = rtnuser.Headline;
    prof_summary.textContent = rtnuser.Summary;
}
async function GetUser() {
    try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch('http://localhost:3000/users/pull', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                User_id: userId,
            })
        });

        if (!response.ok) {
            throw new Error('Failed to fetching user');
        }
        const data = await response.json();

        const userrt = data;
        naver(userrt[0]);
        profiler(userrt[0]);
        return userrt;

    } catch (error) {
        console.error('Error fetching user:', error);
    }
}

GetUser();