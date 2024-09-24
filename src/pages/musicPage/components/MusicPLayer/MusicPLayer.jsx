import { useEffect, useRef, useState, memo, useCallback } from 'react';

import styles from './MusicPlayer.module.css';
import musicRecord from '/musicrecord.webp';
import PlayTime from '../PlayTime/PlayTime';
import RemoteButton from '../RemoteButton/RemoteButton';

const MusicPlayer = ({ videoIds = [] }) => {
  const playerRef = useRef(null); // YouTube 플레이어를 참조하기 위한 ref
  const [isReady, setIsReady] = useState(false); // 플레이어가 준비되었는지 여부
  const [isPlaying, setIsPlaying] = useState(false); // 비디오가 재생 중인지 여부
  const [currentTime, setCurrentTime] = useState(0); // 현재 재생 시간
  const [duration, setDuration] = useState(0); // 비디오 총 길이
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // 현재 재생 중인 비디오 인덱스

  // 초기 재생 플레이어 설정을 useCallback으로 메모이제이션
  const initializePlayer = useCallback(() => {
    if (videoIds.length === 0) return;

    playerRef.current = new window.YT.Player('player', {
      height: '0',
      width: '0',
      videoId: videoIds[currentTrackIndex],
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
      playerVars: {
        autoplay: 0, // 자동 재생 비활성화
        controls: 0, // 유튜브 기본 컨트롤러 비활성화
      },
    });
  }, [videoIds, currentTrackIndex]);

  useEffect(() => {
    // YouTube IFrame API 로드
    const loadYouTubeIframeAPI = () => {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);

      // window의 onYouTubeIframeAPIReady 변수에 함수 설정
      window.onYouTubeIframeAPIReady = () => {
        initializePlayer();
      };
    };

    if (window.YT) {
      initializePlayer();
    } else {
      loadYouTubeIframeAPI();
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, [initializePlayer]); // initializePlayer를 의존성 배열에 포함

  // 플레이어 준비 완료 시 호출 함수
  const onPlayerReady = (event) => {
    setDuration(event.target.getDuration()); // 비디오 총 길이 설정
    setCurrentTime(0); // 현재 재생 시간 초기화
    setIsReady(true); // 플레이어 준비 완료

    if (isPlaying) {
      playerRef.current.playVideo();
    }
  };

  // 플레이어 상태 변경 시 호출되는 함수
  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (
      event.data === window.YT.PlayerState.PAUSED ||
      event.data === window.YT.PlayerState.ENDED
    ) {
      setIsPlaying(false);
    }

    // 현재 재생 시간을 1초마다 업데이트합니다.
    if (event.data === window.YT.PlayerState.PLAYING) {
      const interval = setInterval(() => {
        setCurrentTime(playerRef.current.getCurrentTime());
      }, 1000);

      return () => clearInterval(interval);
    }
  };

  // 노래 재생/정지
  const handleTogglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.unMute();
        playerRef.current.playVideo();
      }
    }
  };

  // 다음 노래 재생
  const handleNextTrack = () => {
    if (videoIds.length === 0) return;

    const nextIndex = (currentTrackIndex + 1) % videoIds.length;
    setCurrentTrackIndex(nextIndex);
    setIsReady(false);
  };

  // 이전 노래 재생
  const handlePrevTrack = () => {
    if (videoIds.length === 0) return;

    const prevIndex =
      (currentTrackIndex - 1 + videoIds.length) % videoIds.length;
    setCurrentTrackIndex(prevIndex);
    setIsReady(false);
  };

  // 재생 ProgressBar 클릭 시 해당 시간으로 이동
  const handleSeek = (event) => {
    const newTime = (event.target.value / 100) * duration;
    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  // 비디오가 없을 경우 처리
  if (videoIds.length === 0) {
    return <div>No Audios available</div>;
  }

  return (
    <div className={styles.PlayerWrapper}>
      <div id="player"></div>
      <img src={musicRecord}></img>
      <div className={styles.MusicInfo}>
        <p>내가 S면 넌 나의 N이 되어줘 TWS의 노래</p>
        <span>TWS (투어스)</span>
      </div>
      <div className={styles.progressBar}>
        <input
          type="range"
          min="0"
          max="100"
          value={
            isNaN((currentTime / duration) * 100)
              ? 0
              : (currentTime / duration) * 100
          }
          onChange={handleSeek}
          disabled={!isReady}
        />
        <div className={styles.timeDisplay}>
          <PlayTime time={currentTime} colored />
          <PlayTime time={duration} />
        </div>
      </div>
      <div className={styles.controls}>
        <RemoteButton type={'musiclist'} />
        <RemoteButton
          type={'step_backward'}
          onClick={handlePrevTrack}
          disabled={videoIds.length === 0}
        />
        <RemoteButton
          type={isPlaying ? 'pause' : 'play'}
          onClick={handleTogglePlay}
          disabled={!isReady}
        />
        <RemoteButton
          type={'step_forward'}
          onClick={handleNextTrack}
          disabled={videoIds.length === 0}
        />
        <RemoteButton type={'heart'} />
      </div>
    </div>
  );
};

export default memo(MusicPlayer);
