import { getCelebrationList } from '@lib/api/schedule';

import useAuthStore from '@/stores/auth';

import dayjs from 'dayjs';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const Anniversary = () => {
  const { user } = useAuthStore();
  const { data: celebrations, refetch: refetchCelebrations } = useQuery(
    ['celebrations', user?.id],
    () => getCelebrationList(user?.id as number),
    { enabled: !!user },
  );
  const today = new Date();
  console.log(today.getTime());

  return (
    <Container>
      <div className="headLine">
        <img src="/images/home/line-love.png" />
      </div>
      <div className="contentsWrapper">
        {celebrations && celebrations.length > 0 ? (
          celebrations.map((celebration: any) => {
            const celebrationDate = new Date(celebration.startDate);
            const diffInDays = Math.floor(
              (celebrationDate.getTime() - today.getTime()) /
                (1000 * 3600 * 24),
            );
            const dDay =
              Math.sign(diffInDays) >= 0
                ? `- ${diffInDays}`
                : `+ ${Math.abs(diffInDays)}`;

            return (
              <div key={celebration.id} className="contents">
                <div className="left">
                  <img
                    src={`/images/home/celebration/${celebration.sticker}.png`}
                    alt="스티커"
                    className="icon"
                  />
                  <span className="title">{celebration.title}</span>
                </div>
                <div className="date">D {dDay}</div>
              </div>
            );
          })
        ) : (
          <div className="contents none">
            <p>일정을 등록하고 기념일을 설정해보세요!</p>
          </div>
        )}
      </div>
      <div className="bottomLine">
        <img src="/images/home/line-love.png" />
      </div>
    </Container>
  );
};
const Container = styled.div`
  margin-bottom: 20px;
  padding: 0 60px;
  @media ${({ theme }) => theme.devices.mobile} {
    padding: 0 40px;
  }
  .contentsWrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 12px 0;
    .contents {
      display: flex;
      justify-content: space-between;
      &.none {
        padding: 8px 0;
        p {
          width: 100%;
          text-align: center;
          text-decoration: underline;
          text-underline-offset: 4px;
          cursor: pointer;
        }
      }
      .left {
        display: flex;
        align-items: center;
        gap: 8px;
        .icon {
          width: 20px;
        }
      }
      .date {
        min-width: 60px;
      }
    }
  }
`;

export default Anniversary;
