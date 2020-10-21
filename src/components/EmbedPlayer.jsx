import React, { Component } from "react";
import ReactPlayer from "react-player";

import "./defaults.scss";

import Duration from "./Duration";

class EmbedPlayer extends Component {
  state = {
    url: null,
    pip: false,
    playing: false,
    controls: true,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
  };

  componentDidMount () {
    const { url } = this.props;
    this.setState({
      url,
    });
  }

  load = (url) => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false,
    });
  };

  handleVolumeChange = (e) => {
    this.setState({ volume: parseFloat(e.target.value) });
  };

  handlePlay = () => {
    console.log("onPlay");
    this.setState({ playing: true });
  };

  handlePause = () => {
    console.log("onPause");
    this.setState({ playing: false });
  };

  handleSeekMouseDown = (e) => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleProgress = (state) => {
    console.log("onProgress", state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  handleEnded = () => {
    console.log("onEnded");
    this.setState({ playing: this.state.loop });
  };

  handleDuration = (duration) => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };

  renderLoadButton = (url, label) => {
    return <button onClick={() => this.load(url)}>{label}</button>;
  };

  ref = (player) => {
    this.player = player;
  };

  render() {
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
      pip,
    } = this.state;

    return (
      <div className="app">
        <section className="section">
          <div className="player-wrapper" style={{display: 'flex', justifyContent: "center"}}>
            <ReactPlayer
              ref={this.ref}
              className="react-player"
              url={url}
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onPlay={this.handlePlay}
              onPause={this.handlePause}
              onEnded={this.handleEnded}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
            />
          </div>

          <table>
            <tbody>
              <tr>
                <td>Seek</td>
                <td>
                  <input
                    type="range"
                    min={0}
                    max={0.999999}
                    step="any"
                    value={played}
                    onMouseDown={this.handleSeekMouseDown}
                    onChange={this.handleSeekChange}
                    onMouseUp={this.handleSeekMouseUp}
                  />
                </td>
                <td>Volume</td>
                <td>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={this.handleVolumeChange}
                  />
                </td>
              </tr>
              <tr>
                <th>Played</th>
                <td colSpan={3}>
                  <progress max={1} value={played} />
                </td>
              </tr>
              <tr>
                <th>Loaded</th>
                <td colSpan={3}>
                  <progress max={1} value={loaded} />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="section">
          <table>
            <tbody>
              <tr>
                <td>
                  {this.renderLoadButton(
                    "https://www.youtube.com/watch?v=jNgP6d9HraI",
                    "Youtube"
                  )}
                </td>
                <td>
                  {this.renderLoadButton(
                    "https://www.facebook.com/FacebookDevelopers/videos/10152454700553553/",
                    "Facebook"
                  )}
                </td>
                <td>
                  {this.renderLoadButton(
                    "https://vimeo.com/169599296",
                    "Vimeo"
                  )}
                </td>
                <td>
                  {this.renderLoadButton(
                    "https://www.twitch.tv/kronovi",
                    "Twitch"
                  )}
                </td>
              </tr>
              <tr>
                <th>Custom URL</th>
                <td colSpan={3}>
                  <input
                    ref={(input) => {
                      this.urlInput = input;
                    }}
                    type="text"
                    placeholder="Enter URL"
                  />
                  <button
                    onClick={() => this.setState({ url: this.urlInput.value })}
                  >
                    Load
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <h2>State</h2>

          <table>
            <tbody>
              <tr>
                <th>url</th>
                <td className={!url ? "faded" : ""}>
                  {(url instanceof Array ? "Multiple" : url) || "null"}
                </td>
              </tr>
              <tr>
                <th>playing</th>
                <td>{playing ? "true" : "false"}</td>
              </tr>
              <tr>
                <th>volume</th>
                <td>{volume.toFixed(3)}</td>
              </tr>
              <tr>
                <th>played</th>
                <td>{(played*100).toFixed(1)}%</td>
              </tr>
              <tr>
                <th>loaded</th>
                <td>{loaded.toFixed(3)}</td>
              </tr>
              <tr>
                <th>duration</th>
                <td>
                  <Duration seconds={duration} />
                </td>
              </tr>
              <tr>
                <th>elapsed</th>
                <td>
                  <Duration seconds={duration * played} />
                </td>
              </tr>
              <tr>
                <th>remaining</th>
                <td>
                  <Duration seconds={duration * (1 - played)} />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default EmbedPlayer;
