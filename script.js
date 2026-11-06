// Unslopped Profile State Management
const STORAGE_KEY = 'nazu_unslopped_profile_v2';

const defaultProfile = {
  name: 'Nazmunnahar Nazu',
  handle: '@nazu3872',
  bio: 'Full-stack web development student at Programming Hero. Focused on building responsive user interfaces, modular backend services, and clean, accessible code.',
  projects: '24',
  following: '350',
  followers: '1.2k',
  photoUrl: 'profile.jpg',
  isFollowing: false
};

// DOM References
const displayFullName = document.getElementById('displayFullName');
const displayHandle = document.getElementById('displayHandle');
const displayBio = document.getElementById('displayBio');
const displayPosts = document.getElementById('displayPosts');
const displayFollowing = document.getElementById('displayFollowing');
const displayFollowers = document.getElementById('displayFollowers');
const avatarImage = document.getElementById('avatarImage');
const avatarInput = document.getElementById('avatarInput');
const avatarContainer = document.querySelector('.avatar-container');

const followBtn = document.getElementById('followBtn');
const editProfileBtn = document.getElementById('editProfileBtn');
const editModal = document.getElementById('editModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const profileForm = document.getElementById('profileForm');

const inputName = document.getElementById('inputName');
const inputHandle = document.getElementById('inputHandle');
const inputBio = document.getElementById('inputBio');
const inputProjects = document.getElementById('inputProjects');
const inputFollowing = document.getElementById('inputFollowing');
const inputFollowers = document.getElementById('inputFollowers');
const messageBtn = document.getElementById('messageBtn');

// Load & Save
function loadProfile() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaultProfile;
  try {
    return { ...defaultProfile, ...JSON.parse(saved) };
  } catch {
    return defaultProfile;
  }
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

  // Toggle follow state
  const btnLabel = followBtn.querySelector('.btn-label');
  if (profile.isFollowing) {
    followBtn.classList.add('following');
    btnLabel.textContent = 'Following';
  } else {
    followBtn.classList.remove('following');
    btnLabel.textContent = 'Follow';
  }
}

let currentProfile = loadProfile();
renderProfile(currentProfile);

// Follow Toggle
followBtn.addEventListener('click', () => {
  currentProfile.isFollowing = !currentProfile.isFollowing;
  saveProfile(currentProfile);
  renderProfile(currentProfile);
});

// Message trigger
messageBtn.addEventListener('click', () => {
  alert(`Connecting with ${currentProfile.name} (${currentProfile.handle})`);
});

// Modal Dialog Controls
function openModal() {
  inputName.value = currentProfile.name;
  inputHandle.value = currentProfile.handle;
  inputBio.value = currentProfile.bio;
  inputProjects.value = currentProfile.projects;
  inputFollowing.value = currentProfile.following;
  inputFollowers.value = currentProfile.followers;
  editModal.classList.add('open');
  editModal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  editModal.classList.remove('open');
  editModal.setAttribute('aria-hidden', 'true');
}

editProfileBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
cancelEditBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// Form Submission
profileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  currentProfile.name = inputName.value.trim() || currentProfile.name;
  currentProfile.handle = inputHandle.value.trim() || currentProfile.handle;
  currentProfile.bio = inputBio.value.trim() || currentProfile.bio;
  currentProfile.projects = inputProjects.value.trim() || currentProfile.projects;
  currentProfile.following = inputFollowing.value.trim() || currentProfile.following;
  currentProfile.followers = inputFollowers.value.trim() || currentProfile.followers;

  saveProfile(currentProfile);
  renderProfile(currentProfile);
  closeModal();
});

// Local Photo Selection
avatarContainer.addEventListener('click', () => {
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
