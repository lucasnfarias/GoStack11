import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { justifyContent: 'center' },
})`
  padding: 0 30px ${Platform.OS === 'android' ? 70 : 40}px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;
