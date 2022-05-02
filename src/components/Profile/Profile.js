import { useSelector } from "react-redux";
import styled, { css } from "styled-components/macro";
import { FiUsers, FiMail } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { FaTwitter } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <ProfileContainer>
      <Avatar src={user.avatar_url} alt={user.login} />
      <ProfileDescription>
        <ProfileName>{user.name}</ProfileName>
        <ProfileNickName>{user.login}</ProfileNickName>
        <ProfileBio>{user.bio}</ProfileBio>

        <ProfileButton>Edit Profile</ProfileButton>

        <ProfileFollows>
          <ProfileFollowers>
            <FollowersIcon />
            <FollowSpan>{user.followers}</FollowSpan> followers &#8226;
          </ProfileFollowers>
          <ProfileFollowing>
            {" "}
            <FollowSpan>{user.following}</FollowSpan> following
          </ProfileFollowing>
        </ProfileFollows>

        <ProfileLocationDetails>
          {user.location && (
            <ProfileLocation>
              <GoLocation />
              {user.location}
            </ProfileLocation>
          )}
          <ProfileMail>
            <FiMail />
            <ProfileEmail href={`mailto:${user.email}`}>
              {user.email}
            </ProfileEmail>
          </ProfileMail>

          {user.twitter_username && (
            <ProfileTwitter>
              <FaTwitter />
              {user.twitter_username}
            </ProfileTwitter>
          )}
        </ProfileLocationDetails>

        <Divider />

        <ProfileAchievements>Achievements</ProfileAchievements>
        <Divider />
        <ProfileOrganizations>Organizations</ProfileOrganizations>
      </ProfileDescription>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  position: relative;
  flex-basis: 25%;
  margin: 10px;
`;

const ProfileDescription = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ProfileName = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const ProfileNickName = styled.p`
  font-size: 18px;
  margin: 5px 0;
  color: grey;
`;

const ProfileButton = styled.button`
  font-size: 12px;
  margin: 15px 0;
  font-weight: 600;
  padding: 5px 16px;
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 4px;
  text-align: center;
  color: #24292f;

  ${(props) =>
    props.fontSize
      ? css`
          font-size: props.fontSize;
        `
      : ""}

  cursor: pointer;
`;

const ProfileBio = styled.p`
  font-size: 15px;
  margin: 20px 0 5px 0;
`;

const ProfileFollows = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ProfileFollowers = styled.p`
  font-size: 13px;
  cursor: pointer;
  margin-right: 5px;
  align-items: center;

  &:hover {
    color: #0969da;
  }
`;

const FollowersIcon = styled(FiUsers)`
  color: "#969696";
  margin-right: 8px;

  &:hover {
    color: #0969da;
  }
`;

const ProfileFollowing = styled.p`
  font-size: 13px;
  cursor: pointer;
  align-items: center;

  &:hover {
    color: #0969da;
  }
`;

const FollowSpan = styled.span`
  font-weight: 600;
`;

const ProfileLocationDetails = styled.div`
  margin-top: 20px;
`;

const ProfileMail = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileEmail = styled.a`
  font-size: 13px;
  margin: 10px;
  text-decoration: none;
  color: inherit;

  &:hover {
    color: #0969da;
    text-decoration: underline;
  }
`;

const ProfileLocation = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileTwitter = styled.div`
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  margin-top: 10px;
  border-bottom: 1px solid hsla(210, 18%, 87%, 1);
  width: 100%;
`;

const Avatar = styled.img`
  height: auto;
  width: 294px;
  border-radius: 50%;
  overflow: hidden;
  vertical-align: middle;
  flex-shrink: 0;
  box-shadow: 0 0 0 1px rgba(27, 31, 36, 0.15);
  border: 1px solid #d0d7de;
  position: relative;
  top: -40px;
`;

const ProfileAchievements = styled.div`
  margin: 15px 0;
  font-weight: 600;
  font-size: 14px;
`;

const ProfileOrganizations = styled.div`
  margin: 15px 0;
  font-weight: 600;
  font-size: 14px;
`;

export default Profile;
