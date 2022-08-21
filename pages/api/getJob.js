export const getJob = async (id, prisma) => {
    const job = await prisma.job.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        user: true,
      },
    })
  
    return job
  }

  