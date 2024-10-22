import { useEffect, useRef, useState, memo, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { array } from 'prop-types';

import styles from './MusicPlayer.module.css';
import musicRecord from '/musicrecord.webp';
import PlayTime from '../PlayTime/PlayTime';
import RemoteButton from '../RemoteButton/RemoteButton';
import MusicButton from '../MusicButton/MusicButton';

MusicPlayer.propTypes = {
  musicList: array,
};

function MusicPlayer({ musicList = [] }) {
  const playerRef = useRef(null); // YouTube 플레이어를 참조하기 위한 ref
  const [isReady, setIsReady] = useState(false); // 플레이어가 준비되었는지 여부
  const [isPlaying, setIsPlaying] = useState(false); // 비디오가 재생 중인지 여부
  const [currentTime, setCurrentTime] = useState(0); // 현재 재생 시간
  const [duration, setDuration] = useState(0); // 비디오 총 길이
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // 현재 재생 중인 비디오 인덱스

  const controls = useAnimation(); // 애니메이션 훅

  // 플레이어 준비 완료 시 호출 함수
  const onPlayerReady = useCallback(
    (event) => {
      setDuration(event.target.getDuration());
      setCurrentTime(0);
      setIsReady(true);

      if (isPlaying) {
        playerRef.current.playVideo();
      }
    },
    [isPlaying]
  );

  // 초기 재생 플레이어 설정을 useCallback으로 메모이제이션
  const initializePlayer = useCallback(() => {
    if (musicList.length === 0) return;

    playerRef.current = new window.YT.Player('player', {
      height: '0',
      width: '0',
      videoId: musicList[currentTrackIndex].videoId,
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
      playerVars: {
        autoplay: 0, // 자동 재생 비활성화
        controls: 0, // 유튜브 기본 컨트롤러 비활성화
      },
    });
  }, [musicList, currentTrackIndex, onPlayerReady]);

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
        if (
          playerRef.current &&
          typeof playerRef.current.getCurrentTime === 'function'
        ) {
          setCurrentTime(playerRef.current.getCurrentTime());
        }
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
    if (musicList.length === 0) return;

    const nextIndex = (currentTrackIndex + 1) % musicList.length;
    setCurrentTrackIndex(nextIndex);
    setIsReady(false);
  };

  // 이전 노래 재생
  const handlePrevTrack = () => {
    if (musicList.length === 0) return;

    const prevIndex =
      (currentTrackIndex - 1 + musicList.length) % musicList.length;
    setCurrentTrackIndex(prevIndex);
    setIsReady(false);
  };

  // index 노래 재생
  const handleIndexTrack = (index) => {
    if (musicList.length === 0) return;

    setCurrentTrackIndex(index);
    setIsReady(false);
  };

  // 재생 ProgressBar 클릭 시 해당 시간으로 이동
  const handleSeek = (event) => {
    const newTime = (event.target.value / 100) * duration;
    playerRef.current.seekTo(newTime, true);
    setCurrentTime(newTime);
  };

  // 노래가 재생될 때 회전 애니메이션 시작
  useEffect(() => {
    if (isPlaying) {
      controls.start({
        rotate: 360,
        transition: {
          repeat: Infinity, // 무한 반복
          duration: 10, // 10초 동안 한 바퀴 회전
          ease: 'linear',
        },
      });
    } else {
      controls.stop(); // 재생이 멈추면 회전 중단
    }
  }, [isPlaying, controls]);

  // 비디오가 없을 경우 처리
  if (musicList.length === 0) {
    return <div>No Audios available</div>;
  }

  return (
    <div className={styles.PlayerWrapper}>
      <div id="player"></div>
      <motion.img
        src={musicRecord}
        animate={controls} // controls를 animate에 연결
        style={{ rotate: 0 }} // 초기 회전 상태 설정
      />
      <div className={styles.MusicInfo}>
        <p>{musicList[currentTrackIndex].content.musicTitle}</p>
        <span>{musicList[currentTrackIndex].content.musicArtist}</span>
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
          disabled={musicList.length === 0}
        />
        <RemoteButton
          type={isPlaying ? 'pause' : 'play'}
          onClick={handleTogglePlay}
          disabled={!isReady}
        />
        <RemoteButton
          type={'step_forward'}
          onClick={handleNextTrack}
          disabled={musicList.length === 0}
        />
        <RemoteButton type={'heart'} />
      </div>
      <div className={styles.MusicList}>
        <span>재생목록</span>
        {musicList.map((music, index) => (
          <MusicButton
            key={index}
            musicTitle={music.content.musicTitle}
            musicArtist={music.content.musicArtist}
            index={index}
            onClick={() => handleIndexTrack(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(MusicPlayer);
