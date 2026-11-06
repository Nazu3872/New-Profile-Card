// LocalStorage State Management
const STORAGE_KEY = 'nazu_profile_data';

const defaultProfile = {
  name: 'Nazmunnahar Nazu',
  handle: '@nazu3872',
  bio: "I'm Nazmunnahar Nazu, an enthusiastic full-stack developer learning at Programming Hero. I specialize in building modern, responsive, user-centered web applications with clean code and intuitive design.",
  projects: '24',
  following: '350',
  followers: '1.2k',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80',
  isFollowing: false
};

// Elements
const displayFullName = document.getElementById('displayFullName');
const displayHandle = document.getElementById('displayHandle');
const displayBio = document.getElementById('displayBio');
const displayPosts = document.getElementById('displayPosts');
const displayFollowing = document.getElementById('displayFollowing');
const displayFollowers = document.getElementById('displayFollowers');
const avatarImage = document.getElementById('avatarImage');
const avatarInput = document.getElementById('avatarInput');
const avatarWrapper = document.querySelector('.avatar-wrapper');

const followBtn = document.getElementById('followBtn');
const editProfileBtn = document.getElementById('editProfileBtn');
const editModal = document.getElementById('editModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const profileForm = document.getElementById('profileForm');

const inputName = document.getElementById('inputName');
const inputHandle = document.getElementById('inputHandle');
const inputBio = document.getElementById('inputBio');
const inputProjects = document.getElementById('inputProjects');
const inputFollowing = document.getElementById('inputFollowing');
const inputFollowers = document.getElementById('inputFollowers');
const inputPhotoUrl = document.getElementById('inputPhotoUrl');
const messageBtn = document.getElementById('messageBtn');

// Load stored data or defaults
function loadProfile() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
}

function saveProfile(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function renderProfile(profile) {
  displayFullName.textContent = profile.name;
  displayHandle.textContent = profile.handle;
  displayBio.textContent = profile.bio;
  displayPosts.textContent = profile.projects;
  displayFollowing.textContent = profile.following;
  displayFollowers.textContent = profile.followers;
  if (profile.photoUrl) {
    avatarImage.src = profile.photoUrl;
  }

  // Update Follow button state
  if (profile.isFollowing) {
    followBtn.classList.add('following');
    followBtn.querySelector('.btn-text').textContent = 'Following';
  } else {
    followBtn.classList.remove('following');
    followBtn.querySelector('.btn-text').textContent = 'Follow';
  }
}

let currentProfile = loadProfile();
renderProfile(currentProfile);

// Toggle Follow state
followBtn.addEventListener('click', () => {
  currentProfile.isFollowing = !currentProfile.isFollowing;
  saveProfile(currentProfile);
  renderProfile(currentProfile);
});

// Message button interaction
messageBtn.addEventListener('click', () => {
  alert(`Send a message to ${currentProfile.name} (${currentProfile.handle})`);
});

// Modal open/close
editProfileBtn.addEventListener('click', () => {
  inputName.value = currentProfile.name;
  inputHandle.value = currentProfile.handle;
  inputBio.value = currentProfile.bio;
  inputProjects.value = currentProfile.projects;
  inputFollowing.value = currentProfile.following;
  inputFollowers.value = currentProfile.followers;
  inputPhotoUrl.value = currentProfile.photoUrl || '';
  editModal.classList.add('open');
});

function closeModal() {
  editModal.classList.remove('open');
}

closeModalBtn.addEventListener('click', closeModal);
cancelEditBtn.addEventListener('click', closeModal);

editModal.addEventListener('click', (e) => {
  if (e.target === editModal) {
    closeModal();
  }
});

// Save edits
profileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  currentProfile.name = inputName.value.trim() || currentProfile.name;
  currentProfile.handle = inputHandle.value.trim() || currentProfile.handle;
  currentProfile.bio = inputBio.value.trim() || currentProfile.bio;
  currentProfile.projects = inputProjects.value.trim() || currentProfile.projects;
  currentProfile.following = inputFollowing.value.trim() || currentProfile.following;
  currentProfile.followers = inputFollowers.value.trim() || currentProfile.followers;
  
  if (inputPhotoUrl.value.trim()) {
    currentProfile.photoUrl = inputPhotoUrl.value.trim();
  }

  saveProfile(currentProfile);
  renderProfile(currentProfile);
  closeModal();
});

// Avatar click to upload local photo
avatarWrapper.addEventListener('click', () => {
  avatarInput.click();
});

avatarInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      currentProfile.photoUrl = event.target.result;
      saveProfile(currentProfile);
      renderProfile(currentProfile);
    };
    reader.readAsDataURL(file);
  }
});
