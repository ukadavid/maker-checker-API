import { PrismaClient, RequestStatus } from '@prisma/client';
import { CustomError } from '../exceptions';

const prisma = new PrismaClient();

export async function approveRequestService(requestId: string, approverId: string, status: string): Promise<any> {
  try {
    
    const request = await prisma.request.findFirst({
      where: {
        id: requestId,
      },
    });

    if (!request) {
        return { error: 'Request not found'};
    }

    if (request.status.toUpperCase() == "APPROVED") {
        return { error: 'Request has been approved already'};
    }


    const today = new Date();
    console.log(today, request.expiration);
    
  
    if (request.expiration < today) {
        return { error: 'Sorry, request has expired'};
    }

    if (request.requesterId === approverId) {
        return { error: 'Requester cannot approve their own request'};
    }

    const approver = await prisma.approver.findUnique({
      where: {
        id: approverId,
      },
    });

    if (!approver) {
        return { error: 'Approver not found'};
    }

for (const approvedType of approver.approvedRequestTypes) {
    if (approvedType === "A") {
      if (request.requestType === "A" || request.requestType === "B" || request.requestType === "C") {
        return { error: 'Sorry, you cannot approve requests'};
      }
    } else if (approvedType === "B") {
      if (request.requestType === "B" || request.requestType === "C") {
        return { error: 'Approver of type B cannot approve requests of type B or C'};
      }
    } else if (approvedType === "C") {
      if (request.requestType === "C") {
        return { error: 'Approver of type C cannot approve requests of type C'};
      }
    }
  }
  

    let updatedRequest;
    switch (status.toUpperCase()) {
      case RequestStatus.APPROVED:
        updatedRequest = await prisma.request.update({
          where: { id: requestId },
          data: { status: RequestStatus.APPROVED },
        });
        break;
      case RequestStatus.DENIED:
        updatedRequest = await prisma.request.update({
          where: { id: requestId },
          data: { status: RequestStatus.DENIED },
        });
        break;
    }

    return updatedRequest;
  } catch (error) {
    return { error: 'Failed to approve request'};
  }
}
