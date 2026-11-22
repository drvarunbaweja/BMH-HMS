/* BMH — Queue TV silent sign-in (v191). The queue display board signs in to Firebase anonymously — no login
 * screen, nothing to type, and no password anywhere — so the TVs keep reading the live queue once the database
 * rules are tightened to signed-in sessions only. The display, the slides and the remote selection are all
 * unchanged.
 *
 * Today the database rules are still open, so this changes nothing visible: if the Anonymous provider is not yet
 * switched on in Firebase, the board simply reads as it always has. Before the rules are tightened:
 *   1. Firebase console -> Authentication -> Sign-in method -> enable "Anonymous".
 *   2. In the rules, allow an anonymous session to READ only the queue, nothing else.
 *
 * Off switch (this TV's browser): localStorage.setItem('bmh_tv_signin_off','1') then reload.
 */
(function () {
  'use strict';
  try { if (localStorage.getItem('bmh_tv_signin_off') === '1') return; } catch (e) {}

  function ready() {
    return !!(window.firebase && firebase.apps && firebase.apps.length && firebase.auth);
  }
  function signIn() {
    try {
      var a = firebase.auth();
      try { a.setPersistence(firebase.auth.Auth.Persistence.LOCAL); } catch (e) {}
      if (a.currentUser) return true;           // already signed in (survives TV restarts)
      a.signInAnonymously().catch(function () {}); // harmless if Anonymous isn't enabled yet
      return true;
    } catch (e) { return false; }
  }

  // The board initialises Firebase itself near the end of the page; wait quietly until it's ready, then sign in.
  if (ready() && signIn()) return;
  var tries = 0;
  var t = setInterval(function () {
    tries++;
    if ((ready() && signIn()) || tries > 40) clearInterval(t); // give up after ~10s
  }, 250);
})();
