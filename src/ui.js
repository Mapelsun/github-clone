export default class UI {
  toggleMobileNav() {
    const hamburger = document.querySelector("#hamburger"),
      mobileMenu = document.querySelector("#mobileMenu"),
      navLinks = document.querySelectorAll(".mobile-nav__item");

    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("show-mobile");
    });

    navLinks.forEach((nav) => {
      nav.addEventListener("click", () => {
        mobileMenu.classList.remove("show-mobile");
      });
    });
  }

  stickyProfile() {
    const stickyPic = document.querySelector(".user-sticky");
    if (window.pageYOffset > 400) {
      stickyPic.classList.add("make-sticky");
      stickyPic.style.opacity = "1";
      stickyPic.style.display = "flex";
      stickyPic.style.pointerEvents = "auto";
    } else {
      stickyPic.classList.remove("make-sticky");
      stickyPic.style.opacity = "0";
      stickyPic.style.display = "none";
      stickyPic.style.pointerEvents = "none";
    }
  }

  updateUserDetails(data) {
    const avatarImage = document.querySelector(".details__image"),
      mobileMenuImg = document.querySelectorAll(".icon-avatar"),
      userName = document.querySelector(".details__name"),
      userQuote = document.querySelector(".details__emoji p"),
      userQuoteImgBox = document.querySelector(".details__emoji div"),
      badgeBox = document.querySelector(".details__badge div"),
      badgeMessage = document.querySelector(".details__badge span"),
      repositoriesCount = document.querySelectorAll(".counter"),
      stickyProfileImg = document.querySelector(".user-sticky img"),
      stickyProfileName = document.querySelector(".user-sticky span"),
      followersCount = document.querySelector(
        ".details__stats a:nth-of-type(1) span:nth-of-type(1)"
      ),
      followingsCount = document.querySelector(
        ".details__stats a:nth-of-type(2) span:nth-of-type(1)"
      ),
      starsCount = document.querySelector(
        ".details__stats a:nth-of-type(3) span:nth-of-type(1)"
      ),
      company = document.querySelector(
        ".details__contact a:nth-of-type(1) span"
      ),
      location = document.querySelector(
        ".details__contact a:nth-of-type(2) span"
      ),
      website = document.querySelector(
        ".details__contact a:nth-of-type(3) span"
      ),
      websiteUrl = document.querySelector(".details__contact a:nth-of-type(3)"),
      twitter = document.querySelector(
        ".details__contact a:nth-of-type(4) span"
      );

    // updating avatar image
    avatarImage.src = data.avatarUrl;
    mobileMenuImg.forEach((nav) => (nav.src = data.avatarUrl));

    // updating user name
    userName.textContent = data.name;

    // updating user quote box
    userQuote.textContent = data.status.message;
    const emojiBox = document.createElement('div');
    const emoji = data.status.emojiHTML;
    emojiBox.innerHTML = emoji;
    userQuoteImgBox.appendChild(emojiBox);

    // updating badgeBox
    const emojiWrapper = document.createElement('div');
    const emojiTwo = data.status.emojiHTML;
    emojiWrapper.innerHTML = emojiTwo;
    badgeBox.appendChild(emojiWrapper);
    badgeMessage.textContent = data.status.message;

    // updating stats counts
    followersCount.textContent = data.followers.totalCount;
    followingsCount.textContent = data.following.totalCount;
    starsCount.textContent = data.starredRepositories.totalCount;

    // updating contact details
    company.textContent = data.company;
    location.textContent = data.location;
    website.textContent = data.websiteUrl;
    websiteUrl.href = `https://${data.websiteUrl}`;
    twitter.textContent = `@${data.twitterUsername}`;

    // updating total repositories count
    repositoriesCount.forEach(
      (count) => (count.textContent = data.repositories.totalCount)
    );

    // populating repositories list
    this.displayRepositories(data.repositories.nodes);

    // updating sticky profile image and name
    stickyProfileImg.src = data.avatarUrl;
    stickyProfileName.textContent = data.login;
  }

  formatDate(value) {
    let newValue = new Date(value);
    let now = new Date();

    let diff = now - newValue;
    let checkYear = diff / 31536000000;

    if (checkYear > 1) {
      return (
        newValue.toLocaleDateString("en-US", { month: "short" }) +
        " " +
        newValue.toLocaleDateString("en-US", { day: "numeric" }) +
        ", " +
        newValue.toLocaleDateString("en-US", { year: "numeric" })
      );
    } else {
      return (
        newValue.toLocaleDateString("en-US", { month: "short" }) +
        " " +
        newValue.toLocaleDateString("en-US", { day: "numeric" })
      );
    }
  }

  displayRepositories(repos) {
    const reposList = document.querySelector(".repos");

    repos.forEach((repo) => {
      const li = document.createElement("li");
      li.className = "repos__list";
      let langStack = { ...repo.primaryLanguage };

      li.innerHTML = `
                    <div class="repos__item">
                <div class="repos__details">
                  <div class="heading">
                    <a href="${
                      repo.url
                    }" target="_blank" rel="noopener noreferrer"
                      >${repo.name}</a
                    >
                    ${repo.isPrivate ? "<span>Private</span>" : ""}
                  </div>
                  ${
                    repo.description
                      ? `<p class='description'>${repo.description}</p>`
                      : ""
                  }
                  <div class="more">
                  ${
                    langStack.name
                      ? `<div class='more__lang'><span style='background-color: ${langStack.color};'></span><span>${langStack.name}</span></div>`
                      : ""
                  }
                    <span>Updated on ${this.formatDate(repo.updatedAt)}</span>
                  </div>
                </div>
                <button class="repos__btn">
                  <svg
                    viewBox="0 0 16 16"
                    version="1.1"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
                    ></path></svg
                  ><span>Star</span>
                </button>
              </div>
               `;

      reposList.appendChild(li);
    });
  }

  printMessage(data) {
    alert(data);
  }
}
