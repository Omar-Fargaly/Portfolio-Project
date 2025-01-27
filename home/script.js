function createPostElement(post) {
    // Create main container div
    const mainPost = document.createElement('div');
    mainPost.classList.add('main-post');

    // Create image container
    const imgPostDiv = document.createElement('div');
    imgPostDiv.classList.add('img-post-div');
    
    // Create image element
    const imgPost = document.createElement('img');
    imgPost.src = post.img_url;
    imgPost.alt = '';

    imgPostDiv.appendChild(imgPost);

    // Create main post data container
    const mainPostData = document.createElement('div');
    mainPostData.classList.add('main-post-data');

    // Create share post section
    const sharePost = document.createElement('div');
    sharePost.id = 'share-post';
    const shareIcon = document.createElement('i');
    shareIcon.classList.add('fa-solid', 'fa-share');
    sharePost.appendChild(shareIcon);

    // Create text post data section
    const textPostData = document.createElement('div');
    textPostData.classList.add('text-post-data');

    const postTitle = document.createElement('h4');
    postTitle.textContent = post.title;
    textPostData.appendChild(postTitle);

    const postDescription = document.createElement('p');
    postDescription.textContent =  post.Content;
    textPostData.appendChild(postDescription);

    const readMoreLink = document.createElement('a');
    readMoreLink.href = '#';
    readMoreLink.textContent = 'Read More....';
    textPostData.appendChild(readMoreLink);

    // Create post footer section
    const postFooter = document.createElement('div');
    postFooter.classList.add('post-footer');

    // Create user section in footer
    const userSection = document.createElement('div');

    const userImg = document.createElement('img');
    userImg.src = post.uimg_url;
    userImg.alt = '';

    const userInfo = document.createElement('div');
    const userName = document.createElement('h4');
    userName.textContent = post.First_Name + ' ' + post.Last_Name;
    const postTime = document.createElement('p');
    postTime.textContent = '// Time Here';
    userInfo.appendChild(userName);
    userInfo.appendChild(postTime);
    userSection.appendChild(userImg);
    userSection.appendChild(userInfo);

    // Create like and comment section in footer
    const likeCommentIconsPost = document.createElement('div');
    likeCommentIconsPost.classList.add('like-comment-icons-post');

    const likeSection = document.createElement('div');
    const likeIcon = document.createElement('i');
    likeIcon.classList.add('fa-solid', 'fa-thumbs-up');
    const likeCount = document.createElement('p');
    likeCount.textContent ='0 Likes';
    likeSection.appendChild(likeIcon);
    likeSection.appendChild(likeCount);

    const commentSection = document.createElement('div');
    const commentIcon = document.createElement('i');
    commentIcon.classList.add('fa-solid', 'fa-comment');
    const commentCount = document.createElement('p');
    commentCount.textContent = '0 Comments';
    commentSection.appendChild(commentIcon);
    commentSection.appendChild(commentCount);

    likeCommentIconsPost.appendChild(likeSection);
    likeCommentIconsPost.appendChild(commentSection);

    // Append footer sections to post footer
    postFooter.appendChild(userSection);
    postFooter.appendChild(likeCommentIconsPost);

    // Append all sections to main post data
    mainPostData.appendChild(sharePost);
    mainPostData.appendChild(textPostData);
    mainPostData.appendChild(postFooter);

    // Append image and main post data to the main post
    mainPost.appendChild(imgPostDiv);
    mainPost.appendChild(mainPostData);
    const element = document.querySelector('.main-container');
    element.append(mainPost)
    // Optionally, you can append the main post to a parent element (e.g., the body or a container div)
    const mainElement = document.querySelector('main');  // Select the <main> element
    mainElement.appendChild(element);  // Append the post to the <main> element
}
async function getPosts() {
    try {
        const response = await fetch('http://localhost:3000/posts/select', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const data = await response.json();

        const posts = data;
        createpostelements(posts);
        return posts;

    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}
function createpostelements(posts){
    const o_length = posts.length;
    for (let i = 0; i < o_length; i++)
    {
        createPostElement(posts[i])
        console.log(posts[i].Post_Date)
    }
}

getPosts();

