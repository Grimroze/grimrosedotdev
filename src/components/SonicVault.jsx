import React, { useState, useCallback } from 'react';
import TearTicket from './TearTicket';
import { ExternalLink, RotateCcw } from 'lucide-react';
import './SonicVault.css';

const PLAYLISTS = [
  {
    id: 'heart-cramps',
    title: 'Heart cramps',
    vibe: 'Late night melancholy & acoustic reverie',
    genre: 'Melancholy • Indie • Acoustic',
    stats: 'Curated by Goldi',
    image: '/playlists/urdu-coffee.svg',
    imageAlt: 'Heart cramps Cover Art',
    rotate: -1.6,
    stubAdmit: 'ADMIT 01',
    stubAction: 'RIP TO PLAY',
    stubNumber: 'NO. 001429',
    accentColor: '#fb7185',
    spotifyId: '64IWRoJTxIvA55ckPfFKL1',
    spotifyUrl: 'https://open.spotify.com/playlist/64IWRoJTxIvA55ckPfFKL1'
  },
  {
    id: 'knight-flow',
    title: 'LeetCode Knight // Flow',
    vibe: 'Sub-15ms Dynamic Programming & High-Octane Rush',
    genre: 'Phonk • Dark Synth • 160 BPM',
    stats: '98 Tracks • Speed Run',
    image: '/playlists/knight-flow.svg',
    imageAlt: 'LeetCode Knight Flow Cover Art',
    rotate: 0.5,
    stubAdmit: 'ADMIT 02',
    stubAction: 'TEAR FOR SPEED',
    stubNumber: 'NO. 008921',
    accentColor: '#38bdf8',
    spotifyId: '37i9dQZF1DX11gh2tH1b8e',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX11gh2tH1b8e'
  },
  {
    id: 'latent-space',
    title: 'Latent Space Drift',
    vibe: 'Speculative Decoding & 3 AM Multi-Agent Topology',
    genre: 'Cyber Downtempo • Minimal Tech',
    stats: '142 Tracks • Deep Focus',
    image: '/playlists/latent-drift.svg',
    imageAlt: 'Latent Space Drift Cover Art',
    rotate: 2.0,
    stubAdmit: 'ADMIT 03',
    stubAction: 'RIP TO STREAM',
    stubNumber: 'NO. 004183',
    accentColor: '#c084fc',
    spotifyId: '37i9dQZF1DXdLEN7aqioXM',
    spotifyUrl: 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM'
  }
];

export default function SonicVault({ theme = 'dark' }) {
  const [tornTickets, setTornTickets] = useState({});

  const handleTear = useCallback((id) => {
    setTornTickets(prev => ({ ...prev, [id]: true }));
  }, []);

  const handleReset = useCallback((e, id) => {
    e.stopPropagation();
    setTornTickets(prev => ({ ...prev, [id]: false }));
  }, []);

  return (
    <section id="easter-egg" className="sonic-vault-section">
      <div className="sonic-vault-container">
        {/* Clean, Sharp, Minimalist Sarcastic Header */}
        <div className="sonic-vault-header">
          <h3 className="sonic-vault-title">
            What, you want my playlist now?
          </h3>
          <p className="sonic-vault-subtitle">
            Fine. Pick a ticket, tear the stub.
          </p>
        </div>

        {/* 3 Staggered Physical Tear Tickets */}
        <div className="sonic-tickets-deck">
          {PLAYLISTS.map((playlist) => {
            const isTorn = !!tornTickets[playlist.id];

            return (
              <div key={playlist.id} className="sonic-ticket-item">
                <TearTicket
                  width={420}
                  height={220}
                  stubSize={130}
                  image={playlist.image}
                  imageAlt={playlist.imageAlt}
                  rotate={playlist.rotate}
                  torn={isTorn}
                  onTear={() => handleTear(playlist.id)}
                  background={theme === 'light' ? '#ffffff' : '#18181b'}
                  stubBackground={theme === 'light' ? '#f4f4f5' : '#1f1f24'}
                  borderColor={theme === 'light' ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)'}
                  color={theme === 'light' ? '#09090b' : '#f5f5f5'}
                  stub={
                    <div className="ticket-stub-inner">
                      <span className="ticket-stub-admit">{playlist.stubAdmit}</span>

                      <div className="ticket-stub-rip-cue">
                        <span className="ticket-stub-scissors">✂️</span>
                        <span className="ticket-stub-action-text">{playlist.stubAction}</span>
                      </div>

                      {/* Barcode Graphic */}
                      <div className="ticket-stub-barcode">
                        <span className="ticket-stub-barcode-bar" style={{ width: '2px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '5px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '1px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '4px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '2px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '6px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '3px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '1px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '5px' }} />
                        <span className="ticket-stub-barcode-bar" style={{ width: '2px' }} />
                      </div>

                      <span className="ticket-stub-no">{playlist.stubNumber}</span>
                    </div>
                  }
                >
                  {/* Left Main Ticket Body */}
                  <div className="ticket-body-content">
                    {isTorn ? (
                      /* Official Spotify Embed Player Revealed on Tear! */
                      <div className="ticket-unlocked-state">
                        <iframe
                          style={{
                            borderRadius: '10px',
                            border: 'none',
                            width: '100%',
                            height: '152px',
                            background: 'transparent'
                          }}
                          src={`https://open.spotify.com/embed/playlist/${playlist.spotifyId}?utm_source=generator&theme=${theme === 'light' ? '1' : '0'}`}
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                          title={playlist.title}
                        />
                        <div className="unlocked-actions-row">
                          <a
                            href={playlist.spotifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="unlocked-app-link"
                          >
                            <span>Open in Spotify</span>
                            <ExternalLink size={11} />
                          </a>
                          <button
                            type="button"
                            onClick={(e) => handleReset(e, playlist.id)}
                            className="ticket-reset-btn"
                            title="Re-stitch stub"
                          >
                            <RotateCcw size={11} />
                            <span>Re-stitch</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Normal Resting State */
                      <>
                        <h4 className="ticket-playlist-title">{playlist.title}</h4>
                        <p className="ticket-playlist-vibe">{playlist.vibe}</p>

                        <div className="ticket-footer-row">
                          <span className="ticket-stats">{playlist.stats}</span>
                          <div className="ticket-eq-bars">
                            <span
                              className="ticket-eq-bar"
                              style={{ backgroundColor: playlist.accentColor }}
                            />
                            <span
                              className="ticket-eq-bar"
                              style={{ backgroundColor: playlist.accentColor }}
                            />
                            <span
                              className="ticket-eq-bar"
                              style={{ backgroundColor: playlist.accentColor }}
                            />
                            <span
                              className="ticket-eq-bar"
                              style={{ backgroundColor: playlist.accentColor }}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </TearTicket>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
