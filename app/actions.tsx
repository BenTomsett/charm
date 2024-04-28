'use server';

export async function execute(code: string) {
  if (code === 'success') {
    return { status: 200 };
  } else {
    return { status: 400 };
  }
}
