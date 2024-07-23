export function GET() {
  return Response.json({
    success: true,
    message: 'health check route handler',
  });
}
