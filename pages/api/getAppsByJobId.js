export const getAppsByJobId = async (id, prisma) => {
    const application = await prisma.application.findMany({
      where: {
        jobId: parseInt(id),
      },
      include: {
        user: true
      },
    })
  
    return applications
  }

  