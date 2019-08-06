#include <iostream>
#include <chrono>      // for high_resolution_clock
#include "nmmintrin.h" // for SSE4.2
#include "immintrin.h" // for AVX

void filter_with_vec(__m128 pixel, __m128 mask, __m128 result)
{
  for (int i = 0; i < 1e8; i++)
  {
    __m128 filtered = _mm_mul_ps(pixel, mask);
  }
}

void filter_non_vec(float pixel[], float mask[], float result[])
{
  for (int i = 0; i < 1e8; i++)
  {
    for (int p = 0; p < 4; p++)
    {
      result[p] = pixel[p] * mask[p];
    }
  }
}

int main()
{
  float pixel[4];
  pixel[0] = 124;
  pixel[1] = 123;
  pixel[2] = 255;
  pixel[3] = 155;

  float mask[4];
  mask[0] = 124;
  mask[1] = 123;
  mask[2] = 255;
  mask[3] = 155;

  float result[4];

  __m128 p4 = _mm_set_ps(124,
                         123,
                         255,
                         155);
  
  __m128 m4 = _mm_set_ps(124,
                         123,
                         255,
                         155);
  __m128 r4;
  

  auto startwv = std::chrono::high_resolution_clock::now();
  filter_with_vec(p4, m4, r4);
  auto finishwv = std::chrono::high_resolution_clock::now();
  std::chrono::duration<double> elapsedwv = finishwv - startwv;

  auto startnv = std::chrono::high_resolution_clock::now();
  filter_non_vec(pixel, mask, result);
  auto finishnv = std::chrono::high_resolution_clock::now();
  std::chrono::duration<double> elapsednv = finishnv - startnv;

  std::cout << "Elapsed time nv: " << elapsednv.count() << " s\n";
  std::cout << "Elapsed time wv: " << elapsedwv.count() << "  s\n";

  return 0;
}
