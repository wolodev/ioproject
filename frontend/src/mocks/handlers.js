// src/mocks/handlers.js
import { rest } from 'msw';
import products from './products.json';
import routines from './routines.json';
import routine from './routine.json';
export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    // Persist user's authentication in the session
    sessionStorage.setItem('is-authenticated', 'true');

    return res(
      ctx.json({
        products,
      }),
      ctx.status(200),
      ctx.delay(2000)
    );
  }),

  rest.get('/routines', (req, res, ctx) => {
    return res(
      ctx.json({
        routines,
      }),
      ctx.status(200),
      ctx.delay(2000)
    );
  }),

  rest.get('/routines/:id', (req, res, ctx) => {
    return res(ctx.json(routine), ctx.status(200), ctx.delay(2000));
  }),
];
