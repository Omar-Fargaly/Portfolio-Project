#ifndef _MAIN_H_
#define _MAIN_H_
#include <stdio.h>
#include <SDL2/SDL.h>
#include "applied_math.h"
#include "colors.h"
#include "raycaster.h"
#include "renderer.h"
#define SCREEN_WIDTH 640
#define SCREEN_HEIGHT 480
#define MAP_HEIGHT 24
#define MAP_WIDTH 24
#define BLOCK_HEIGHT 64
#define PLAYER_HEIGHT 32
#define TILE_SIZE 16
#define KEYS 322
#define FOV 66
#define COLOR_DEPTH 32
#define false 0
#define true 1
typedef _Bool bool;
typedef struct SDL_Instance
{
	SDL_Window *window;
	SDL_Renderer *renderer;
	SDL_Surface *screenSurface;
	SDL_Surface *image;
} SDL_Instance;
_Bool initialize_SDL(SDL_Instance *instance);
_Bool loadMedia(SDL_Instance *instance, char *media_path);
_Bool done(SDL_Event *event, bool delay, const unsigned char *keys);
void keep_window(bool *quit);
void colorFill(SDL_Instance *instance, char *color_name);
void end(SDL_Instance *instance);
void readKeys(const unsigned char *keys);
void draw_image(SDL_Instance *instance);
void draw_something(SDL_Instance *instance);
void generate_map(int (*worldMap)[MAP_WIDTH]);
void drawMiniMap(int (*WorldMap)[MAP_WIDTH], SDL_Instance *instance,
				Vector player);
void color_walls(int (*worldMap)[MAP_WIDTH], int mapX, int mapY,
				ColorRGBA *color, int side);
int verLine(int x, int y1, int y2, ColorRGBA *color, SDL_Instance *instance);
int poll_events(void);
int raycaster(Vector object, double *time, double *oldTime,
			SDL_Instance *instance, SDL_Event *event, bool delay,
			const unsigned char *keys);
int DDA(int *hit, int *side, double *sideDistX, double *sideDistY,
		double deltaDistX, double deltaDistY, int *mapX, int *mapY, int stepX,
		int stepY, int (*worldMap)[MAP_WIDTH]);
#endif
