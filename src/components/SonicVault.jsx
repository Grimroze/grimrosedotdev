import React, { useState, useCallback } from 'react';
import TearTicket from './TearTicket';
import { ExternalLink, RotateCcw } from 'lucide-react';
import './SonicVault.css';

const PLAYLISTS = [
  {
    id: 'heart-cramps',
    title: 'Heart cramps',
    curator: 'GRIM',
    stats: '84 Tracks',
    image: '/playlists/heart-cramps.jpg',
    imageAlt: 'Heart cramps Playlist Cover Art',
    rotate: -1.6,
    accentColor: '#fb7185',
    spotifyId: '64IWRoJTxIvA55ckPfFKL1',
    spotifyUrl: 'https://open.spotify.com/playlist/64IWRoJTxIvA55ckPfFKL1'
  },
  {
    id: 'soft-dihh',
    title: 'Soft dihh 🧚',
    curator: 'GRIM',
    stats: '112 Tracks',
    image: '/playlists/soft-dihh.jpg',
    imageAlt: 'Soft dihh Playlist Cover Art',
    rotate: 0.5,
    accentColor: '#38bdf8',
    spotifyId: '1qaSzyjW2q7aVzjvZugV7d',
    spotifyUrl: 'https://open.spotify.com/playlist/1qaSzyjW2q7aVzjvZugV7d'
  },
  {
    id: 'hole-in-the-sky',
    title: 'A hole in the sky',
    curator: 'GRIM',
    stats: '79 Tracks',
    image: '/playlists/hole-in-the-sky.jpg',
    imageAlt: 'A hole in the sky Playlist Cover Art',
    rotate: 2.0,
    accentColor: '#f59e0b',
    spotifyId: '3hNEaKixWENyGYeshCObBU',
    spotifyUrl: 'https://open.spotify.com/playlist/3hNEaKixWENyGYeshCObBU'
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
                      <span className="ticket-stub-brand">SPOTIFY</span>

                      <div className="ticket-stub-meta">
                        <span className="ticket-stub-title">{playlist.title}</span>
                        <span className="ticket-stub-curator">BY {playlist.curator}</span>
                        <span className="ticket-stub-count">{playlist.stats}</span>
                      </div>

                      {/* Clean Minimal Barcode Graphic */}
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
                        <p className="ticket-playlist-vibe">{`Curated by ${playlist.curator}`}</p>

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
