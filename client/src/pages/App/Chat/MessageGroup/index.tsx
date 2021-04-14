import React, { useMemo } from 'react';
import { Message as MessageType } from '@/types/Message';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Message } from '../Message';

const MessageGroupWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 8px 0;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorAvatar = styled(Avatar)`
  margin-right: 4px;
`;

type Props = {
  messages: MessageType[];
};

export const MessageGroup = (props: Props) => {
  const author = useMemo(() => props.messages[0].author, [props.messages]);

  return (
    <MessageGroupWrapper>
      <AuthorAvatar
        size={32}
        src={author.avatar}
        icon={!author.avatar && <UserOutlined />}
      />
      <Group>
        {props.messages.map((message, index) => (
          <Message
            key={message._id}
            message={message}
            nameIsVisible={index === 0}
            isLastMessage={index === props.messages.length - 1}
          />
        ))}
      </Group>
    </MessageGroupWrapper>
  );
};